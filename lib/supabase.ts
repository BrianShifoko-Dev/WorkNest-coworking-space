import { createClient } from '@supabase/supabase-js'

// Lazy-initialized Supabase clients to prevent build-time errors
let supabaseClient: any = null
let serviceSupabaseClient: any = null

// Get Supabase client for client-side operations
export function getSupabase() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Legacy export for backwards compatibility
export const supabase = new Proxy({} as any, {
  get(target, prop) {
    return getSupabase()[prop]
  }
})

// Supabase client for server-side operations (with service role)
export const getServiceSupabase = () => {
  if (!serviceSupabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
    }
    
    serviceSupabaseClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return serviceSupabaseClient
}

