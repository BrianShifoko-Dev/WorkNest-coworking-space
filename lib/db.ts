// MySQL Database Connection for cPanel
// Complete replacement for Supabase

import mysql from 'mysql2/promise'
import { nanoid } from 'nanoid'

// Connection pool
let pool: mysql.Pool | null = null

// Generate UUID-like ID using nanoid
export function generateUUID(): string {
  return nanoid(36) // Generate 36-character unique ID
}

// Get MySQL connection pool
function getPool(): mysql.Pool {
  if (!pool) {
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'worknest',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    }

    // Validate required credentials
    if (!config.user || !config.password) {
      throw new Error('Database credentials are required. Check DB_USER and DB_PASSWORD environment variables.')
    }

    pool = mysql.createPool(config)
  }
  return pool
}

// Export pool getter for direct MySQL queries (when needed)
export function getMySQLPool(): mysql.Pool {
  return getPool()
}

// Query builder class that mimics Supabase API for easy migration
class QueryBuilder {
  private tableName: string
  private conditions: Array<{ column: string; operator: string; value: any }> = []
  private orderByClause?: { column: string; ascending: boolean }
  private limitCount?: number
  private offsetCount?: number
  private selectColumns: string = '*'
  private countMode?: 'exact' | 'planned' | 'estimated'
  private headMode: boolean = false
  private singleMode: boolean = false
  private updateData?: Record<string, any>
  private deleteMode: boolean = false
  private insertData?: Record<string, any> | Record<string, any>[]

  constructor(tableName: string) {
    this.tableName = tableName
  }

  // Make QueryBuilder awaitable (thenable)
  then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any) {
    return this.execute().then(onFulfilled, onRejected)
  }

  select(columns: string = '*', options?: { count?: 'exact' | 'planned' | 'estimated', head?: boolean }) {
    this.selectColumns = columns
    if (options?.count) this.countMode = options.count
    if (options?.head) this.headMode = true
    return this
  }

  eq(column: string, value: any) {
    this.conditions.push({ column, operator: '=', value })
    return this
  }

  neq(column: string, value: any) {
    this.conditions.push({ column, operator: '!=', value })
    return this
  }

  gt(column: string, value: any) {
    this.conditions.push({ column, operator: '>', value })
    return this
  }

  gte(column: string, value: any) {
    this.conditions.push({ column, operator: '>=', value })
    return this
  }

  lt(column: string, value: any) {
    this.conditions.push({ column, operator: '<', value })
    return this
  }

  lte(column: string, value: any) {
    this.conditions.push({ column, operator: '<=', value })
    return this
  }

  in(column: string, values: any[]) {
    this.conditions.push({ column, operator: 'IN', value: values })
    return this
  }

  ilike(column: string, value: any) {
    // MySQL case-insensitive LIKE
    this.conditions.push({ column, operator: 'ILIKE', value })
    return this
  }

  or(condition: string) {
    // Handle Supabase-style OR conditions
    const orMatch = condition.match(/and\(([^,]+),([^)]+)\)/)
    if (orMatch) {
      const cond1 = orMatch[1].trim()
      const cond2 = orMatch[2].trim()

      const parseCond = (condStr: string) => {
        const match = condStr.match(/(\w+)\.(lt|gt|gte|lte)\.(.+)/)
        if (match) {
          const [, col, op, val] = match
          const operator = op === 'lt' ? '<' : op === 'gt' ? '>' : op === 'gte' ? '>=' : '<='
          return { column: col, operator, value: val }
        }
        return null
      }

      const parsed1 = parseCond(cond1)
      const parsed2 = parseCond(cond2)

      if (parsed1 && parsed2) {
        this.conditions.push({ column: '__OR__', operator: 'OR', value: [parsed1, parsed2] })
      }
    }
    return this
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderByClause = { column, ascending: options?.ascending !== false }
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  range(from: number, to: number) {
    this.offsetCount = from
    this.limitCount = to - from + 1
    return this
  }

  async execute() {
    const pool = getPool()
    
    // Handle INSERT queries
    if (this.insertData) {
      const isArray = Array.isArray(this.insertData)
      const dataArray = isArray ? this.insertData : [this.insertData]

      // Process each record
      const processedData = dataArray.map(record => {
        const processed = { ...record }

        // Generate UUID if id not provided
        if (!processed.id) {
          processed.id = generateUUID()
        }

        // Convert JSON fields to strings
        const jsonFields = ['images', 'amenities', 'old_values', 'new_values', 'details']
        jsonFields.forEach(field => {
          if (processed[field] && typeof processed[field] !== 'string') {
            processed[field] = JSON.stringify(processed[field])
          }
        })

        return processed
      })

      const columns = Object.keys(processedData[0]).join(', ')
      const placeholders = processedData.map(() =>
        '(' + Object.values(processedData[0]).map(() => '?').join(', ') + ')'
      ).join(', ')
      const values = processedData.flatMap(record => Object.values(record))

      try {
        await pool.execute(
          `INSERT INTO ${this.tableName} (${columns}) VALUES ${placeholders}`,
          values
        )

        // If select is called after insert, fetch the inserted row(s)
        if (this.selectColumns) {
          const insertedIds = processedData.map(d => d.id)
          const idPlaceholders = insertedIds.map(() => '?').join(', ')
          const selectQuery = `SELECT ${this.selectColumns} FROM ${this.tableName} WHERE id IN (${idPlaceholders})`
          const [insertedRows]: any = await pool.execute(selectQuery, insertedIds)
          
          if (this.singleMode && Array.isArray(insertedRows) && insertedRows.length > 0) {
            return { data: insertedRows[0], error: null }
          }
          if (this.singleMode && (!Array.isArray(insertedRows) || insertedRows.length === 0)) {
            return { data: null, error: { message: 'No rows returned', code: 'PGRST116' } }
          }
          
          return {
            data: isArray ? insertedRows : (insertedRows[0] || processedData[0]),
            error: null
          }
        }
        
        // If no select, return the processed data
        return {
          data: isArray ? processedData : processedData[0],
          error: null
        }
      } catch (error: any) {
        console.error('Database insert error:', error)
        return { data: null, error: { message: error.message, code: error.code } }
      }
    }
    
    // Handle DELETE queries
    if (this.deleteMode) {
      let deleteQuery = `DELETE FROM ${this.tableName}`
      const deleteParams: any[] = []

      // Build WHERE clause for DELETE
      if (this.conditions.length > 0) {
        const whereParts: string[] = []
        for (const cond of this.conditions) {
          if (cond.operator === 'IN') {
            const placeholders = (cond.value as any[]).map(() => '?').join(', ')
            cond.value.forEach((v: any) => deleteParams.push(v))
            whereParts.push(`${cond.column} IN (${placeholders})`)
          } else {
            deleteParams.push(cond.value)
            whereParts.push(`${cond.column} ${cond.operator} ?`)
          }
        }
        deleteQuery += ` WHERE ${whereParts.join(' AND ')}`
      }

      try {
        const [result]: any = await pool.execute(deleteQuery, deleteParams)
        
        // If select is called after delete, fetch the deleted row(s) (MySQL doesn't support RETURNING, so we return success)
        if (this.selectColumns && this.selectColumns !== '*') {
          // For MySQL, we can't return deleted rows, so just return success
          return { data: result, error: null }
        }
        
        return { data: result, error: null }
      } catch (error: any) {
        console.error('Database delete error:', error)
        return { data: null, error: { message: error.message, code: error.code } }
      }
    }
    
    // Handle UPDATE queries
    if (this.updateData) {
      // Convert JSON fields to strings
      const jsonFields = ['images', 'amenities', 'old_values', 'new_values', 'details']
      const processedData = { ...this.updateData }
      jsonFields.forEach(field => {
        if (processedData[field] && typeof processedData[field] !== 'string') {
          processedData[field] = JSON.stringify(processedData[field])
        }
      })

      const setClause = Object.keys(processedData).map(key => `${key} = ?`).join(', ')
      const values = Object.values(processedData)
      let updateQuery = `UPDATE ${this.tableName} SET ${setClause}`
      const updateParams: any[] = [...values]

      // Build WHERE clause for UPDATE
      if (this.conditions.length > 0) {
        const whereParts: string[] = []
        for (const cond of this.conditions) {
          if (cond.operator === 'IN') {
            const placeholders = (cond.value as any[]).map(() => '?').join(', ')
            cond.value.forEach((v: any) => updateParams.push(v))
            whereParts.push(`${cond.column} IN (${placeholders})`)
          } else {
            updateParams.push(cond.value)
            whereParts.push(`${cond.column} ${cond.operator} ?`)
          }
        }
        updateQuery += ` WHERE ${whereParts.join(' AND ')}`
      }

      try {
        await pool.execute(updateQuery, updateParams)
        
        // If select is called after update, fetch the updated row(s)
        if (this.selectColumns) {
          let selectQuery = `SELECT ${this.selectColumns} FROM ${this.tableName}`
          const selectParams: any[] = []
          
          if (this.conditions.length > 0) {
            const whereParts: string[] = []
            for (const cond of this.conditions) {
              if (cond.operator === 'IN') {
                const placeholders = (cond.value as any[]).map(() => '?').join(', ')
                cond.value.forEach((v: any) => selectParams.push(v))
                whereParts.push(`${cond.column} IN (${placeholders})`)
              } else {
                selectParams.push(cond.value)
                whereParts.push(`${cond.column} ${cond.operator} ?`)
              }
            }
            selectQuery += ` WHERE ${whereParts.join(' AND ')}`
          }

          // ORDER BY
          if (this.orderByClause) {
            selectQuery += ` ORDER BY ${this.orderByClause.column} ${this.orderByClause.ascending ? 'ASC' : 'DESC'}`
          }

          // LIMIT
          if (this.limitCount) {
            selectQuery += ` LIMIT ${this.limitCount}`
          }

          const [rows]: any = await pool.execute(selectQuery, selectParams)
          
          if (this.singleMode && Array.isArray(rows) && rows.length > 0) {
            return { data: rows[0], error: null }
          }
          if (this.singleMode && (!Array.isArray(rows) || rows.length === 0)) {
            return { data: null, error: { message: 'No rows returned', code: 'PGRST116' } }
          }
          
          return { data: rows, error: null }
        }
        
        // If no select, just return success
        return { data: null, error: null }
      } catch (error: any) {
        console.error('Database update error:', error)
        return { data: null, error: { message: error.message, code: error.code } }
      }
    }

    // Handle SELECT queries (original logic)
    let query = `SELECT ${this.selectColumns} FROM ${this.tableName}`
    const params: any[] = []

    // Build WHERE clause
    if (this.conditions.length > 0) {
      const whereParts: string[] = []

      for (const cond of this.conditions) {
        if (cond.column === '__OR__' && cond.operator === 'OR') {
          const orConditions = cond.value as Array<{ column: string; operator: string; value: any }>
          const orParts = orConditions.map(orCond => {
            params.push(orCond.value)
            return `${orCond.column} ${orCond.operator} ?`
          })
          whereParts.push(`(${orParts.join(' AND ')})`)
        } else if (cond.operator === 'IN') {
          const placeholders = (cond.value as any[]).map(() => '?').join(', ')
          cond.value.forEach((v: any) => params.push(v))
          whereParts.push(`${cond.column} IN (${placeholders})`)
        } else if (cond.operator === 'ILIKE') {
          params.push(`%${cond.value}%`)
          whereParts.push(`LOWER(${cond.column}) LIKE LOWER(?)`)
        } else {
          params.push(cond.value)
          whereParts.push(`${cond.column} ${cond.operator} ?`)
        }
      }

      query += ` WHERE ${whereParts.join(' AND ')}`
    }

    // ORDER BY
    if (this.orderByClause) {
      query += ` ORDER BY ${this.orderByClause.column} ${this.orderByClause.ascending ? 'ASC' : 'DESC'}`
    }

    // LIMIT and OFFSET
    if (this.limitCount) {
      query += ` LIMIT ${this.limitCount}`
    }
    if (this.offsetCount) {
      query += ` OFFSET ${this.offsetCount}`
    }

    try {
      const [rows] = await pool.execute(query, params)

      if (this.headMode) {
        const countQuery = `SELECT COUNT(*) as count FROM ${this.tableName}` +
          (this.conditions.length > 0 ? ` WHERE ${query.split('WHERE')[1]?.split('ORDER')[0] || ''}` : '')
        const [countRows] = await pool.execute(countQuery, params.slice(0, this.conditions.length))
        return { data: null, count: (countRows as any[])[0]?.count || 0, error: null }
      }

      if (this.countMode === 'exact') {
        const countQuery = `SELECT COUNT(*) as count FROM ${this.tableName}` +
          (this.conditions.length > 0 ? ` WHERE ${query.split('WHERE')[1]?.split('ORDER')[0] || ''}` : '')
        const [countRows] = await pool.execute(countQuery, params.slice(0, this.conditions.length))
        return {
          data: rows,
          count: (countRows as any[])[0]?.count || 0,
          error: null
        }
      }

      if (this.singleMode && Array.isArray(rows) && rows.length > 0) {
        return { data: rows[0], error: null }
      }

      return { data: rows, error: null }
    } catch (error: any) {
      console.error('Database query error:', error)
      return { data: null, error: { message: error.message, code: error.code } }
    }
  }

  async single() {
    this.singleMode = true
    const result = await this.execute()
    if (result.error) return result
    if (Array.isArray(result.data) && result.data.length > 0) {
      return { data: result.data[0], error: null }
    }
    return { data: null, error: { message: 'No rows returned', code: 'PGRST116' } }
  }

  insert(data: Record<string, any> | Record<string, any>[]) {
    // Store insert data for later execution
    this.insertData = Array.isArray(data) ? [...data] : { ...data }
    return this
  }

  update(data: Record<string, any>) {
    // Store update data for later execution
    this.updateData = { ...data }
    return this
  }

  delete() {
    // Set delete mode for later execution
    this.deleteMode = true
    return this
  }
}

// Main database client (Supabase-compatible API)
class DatabaseClient {
  from(tableName: string) {
    return new QueryBuilder(tableName)
  }

  // Direct query execution for complex queries
  async query(sql: string, params: any[] = []) {
    const pool = getPool()
    try {
      const [rows] = await pool.execute(sql, params)
      return { data: rows, error: null }
    } catch (error: any) {
      console.error('Database query error:', error)
      return { data: null, error: { message: error.message, code: error.code } }
    }
  }

  // Test database connection
  async testConnection() {
    try {
      const pool = getPool()
      await pool.execute('SELECT 1')
      return { success: true, message: 'Database connection successful' }
    } catch (error: any) {
      console.error('Database connection test failed:', error)
      return { success: false, message: error.message }
    }
  }
}

// Create singleton instance
const db = new DatabaseClient()

// Export the main database client
export const supabase = db
export const getSupabase = () => db
export const getServiceSupabase = () => db

export default db
