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

  async insert(data: Record<string, any> | Record<string, any>[]) {
    const pool = getPool()
    const isArray = Array.isArray(data)
    const dataArray = isArray ? data : [data]

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

      // Fetch the inserted row(s)
      const insertedIds = processedData.map(d => d.id)
      const idPlaceholders = insertedIds.map(() => '?').join(', ')
      const [insertedRows]: any = await pool.execute(
        `SELECT * FROM ${this.tableName} WHERE id IN (${idPlaceholders})`,
        insertedIds
      )

      return {
        data: isArray ? insertedRows : (insertedRows[0] || processedData[0]),
        error: null
      }
    } catch (error: any) {
      console.error('Database insert error:', error)
      return { data: null, error: { message: error.message, code: error.code } }
    }
  }

  async update(data: Record<string, any>) {
    const pool = getPool()

    // Convert JSON fields to strings
    const jsonFields = ['images', 'amenities', 'old_values', 'new_values', 'details']
    jsonFields.forEach(field => {
      if (data[field] && typeof data[field] !== 'string') {
        data[field] = JSON.stringify(data[field])
      }
    })

    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ')
    const values = Object.values(data)

    let query = `UPDATE ${this.tableName} SET ${setClause}`
    const params: any[] = [...values]

    if (this.conditions.length > 0) {
      const whereClause = this.conditions
        .map((cond) => {
          params.push(cond.value)
          return `${cond.column} ${cond.operator} ?`
        })
        .join(' AND ')
      query += ` WHERE ${whereClause}`
    }

    try {
      const [result] = await pool.execute(query, params)
      return { data: result, error: null }
    } catch (error: any) {
      console.error('Database update error:', error)
      return { data: null, error: { message: error.message, code: error.code } }
    }
  }

  async delete() {
    const pool = getPool()
    let query = `DELETE FROM ${this.tableName}`
    const params: any[] = []

    if (this.conditions.length > 0) {
      const whereClause = this.conditions
        .map((cond) => {
          params.push(cond.value)
          return `${cond.column} ${cond.operator} ?`
        })
        .join(' AND ')
      query += ` WHERE ${whereClause}`
    }

    try {
      const [result] = await pool.execute(query, params)
      return { data: result, error: null }
    } catch (error: any) {
      console.error('Database delete error:', error)
      return { data: null, error: { message: error.message, code: error.code } }
    }
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
