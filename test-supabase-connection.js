// Test Supabase connection and check admin user
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://jsxexqdjndrzajkvflaz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeGV4cWRqbmRyemFqa3ZmbGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDQxMzAsImV4cCI6MjA3ODYyMDEzMH0.mBOzx8H37eIAGUPvngAkSMdnZ4N0ZmXYJ5MF-5P_PeM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...\n')

    // Check if admin user exists
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@worknest.co.ke')
      .single()

    if (error) {
      console.error('❌ Error:', error.message)
      return
    }

    if (!data) {
      console.log('❌ Admin user NOT found!')
      console.log('You need to run FINAL-CREATE-ADMIN.sql in Supabase')
      return
    }

    console.log('✅ Admin user found!')
    console.log('\nUser details:')
    console.log('  Email:', data.email)
    console.log('  Name:', data.full_name)
    console.log('  Role:', data.role)
    console.log('  Status:', data.status)
    console.log('  Password Hash:', data.password_hash.substring(0, 20) + '...')
    console.log('\n✅ Database connection working!')
    console.log('\nNow test password verification...')

    const bcrypt = require('bcryptjs')
    const isValid = await bcrypt.compare('Admin@123', data.password_hash)
    
    if (isValid) {
      console.log('✅ Password verification SUCCESS!')
      console.log('   Password "Admin@123" matches the hash in database')
      console.log('\n🎉 Login should work now!')
    } else {
      console.log('❌ Password verification FAILED!')
      console.log('   The hash in database does not match "Admin@123"')
      console.log('\n⚠️  You need to run FINAL-CREATE-ADMIN.sql again in Supabase')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testConnection()

