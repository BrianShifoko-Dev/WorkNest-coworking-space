import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// GET all settings
export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    console.log('⚙️ Fetching settings', category ? `(category: ${category})` : '')

    let query = supabase
      .from('settings')
      .select('*')
      .order('key', { ascending: true })

    if (category) {
      query = query.eq('category', category)
    }

    const { data: settings, error } = await query

    if (error) {
      console.error('❌ Error fetching settings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform array to object for easier access
    const settingsObj: any = {}
    settings?.forEach((setting) => {
      let value = setting.value

      // Parse JSON values
      if (setting.type === 'json' && value) {
        try {
          value = JSON.parse(value)
        } catch (e) {
          console.error(`Failed to parse JSON for ${setting.key}:`, e)
        }
      }

      // Parse boolean values
      if (setting.type === 'boolean') {
        value = value === 'true'
      }

      // Parse number values
      if (setting.type === 'number') {
        value = parseFloat(value)
      }

      settingsObj[setting.key] = value
    })

    console.log('✅ Found settings:', Object.keys(settingsObj).length)
    return NextResponse.json(settingsObj)
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// PUT update settings
export async function PUT(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()

    console.log('⚙️ Updating settings:', Object.keys(body))

    const updated = []
    const errors = []

    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      try {
        // Convert value to string for storage
        let stringValue = value

        if (typeof value === 'object') {
          stringValue = JSON.stringify(value)
        } else if (typeof value === 'boolean') {
          stringValue = value.toString()
        } else if (typeof value === 'number') {
          stringValue = value.toString()
        }

        const { error } = await supabase
          .from('settings')
          .update({ 
            value: stringValue,
            updated_at: new Date().toISOString()
          })
          .eq('key', key)

        if (error) {
          console.error(`Error updating ${key}:`, error)
          errors.push({ key, error: error.message })
        } else {
          updated.push(key)
          console.log(`✅ Updated ${key}`)
        }
      } catch (err: any) {
        console.error(`Error processing ${key}:`, err)
        errors.push({ key, error: err.message })
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { 
          message: 'Partial update completed', 
          updated, 
          errors 
        },
        { status: 207 } // Multi-Status
      )
    }

    console.log('✅ All settings updated successfully')
    return NextResponse.json({ message: 'Settings updated successfully', updated })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// POST create new setting
export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()

    console.log('⚙️ Creating setting:', body.key)

    const { data: setting, error } = await supabase
      .from('settings')
      .insert({
        key: body.key,
        value: body.value,
        category: body.category || 'system',
        type: body.type || 'string',
        description: body.description || null,
      })
      .select('*')
      .single()

    if (error) {
      console.error('❌ Error creating setting:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Setting created')
    return NextResponse.json(setting, { status: 201 })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}
