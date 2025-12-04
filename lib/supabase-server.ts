// Re-export MySQL wrapper as Supabase-compatible client for backwards compatibility
// This ensures all API routes use MySQL (cPanel) instead of Supabase

import { supabase } from './db'

/**
 * Get database client for server-side API routes
 * Returns MySQL wrapper (not Supabase) for cPanel deployment
 */
export function getSupabaseClient() {
  // Return MySQL wrapper instead of Supabase client
  return supabase
}
