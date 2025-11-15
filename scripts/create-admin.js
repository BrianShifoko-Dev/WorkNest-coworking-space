// Script to create admin user in Supabase
// Run with: node scripts/create-admin.js

const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jsxexqdjndrzajkvflaz.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    console.log('🔐 Generating password hash...')
    
    // Hash the password "Admin@123"
    const password = 'Admin@123'
    const passwordHash = await bcrypt.hash(password, 10)
    
    console.log('✅ Password hash generated')
    console.log('📝 Creating admin user...')

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@worknest.co.ke')
      .single()

    if (existingUser) {
      console.log('⚠️  Admin user already exists, updating...')
      
      // Update existing user
      const { error } = await supabase
        .from('users')
        .update({
          password_hash: passwordHash,
          full_name: 'WorkNest Administrator',
          role: 'manager',
          status: 'active',
          phone: '+254700000000'
        })
        .eq('email', 'admin@worknest.co.ke')

      if (error) {
        console.error('❌ Error updating user:', error)
        return
      }

      console.log('✅ Admin user updated successfully!')
    } else {
      // Create new user
      const { error } = await supabase
        .from('users')
        .insert({
          email: 'admin@worknest.co.ke',
          password_hash: passwordHash,
          full_name: 'WorkNest Administrator',
          phone: '+254700000000',
          role: 'manager',
          status: 'active'
        })

      if (error) {
        console.error('❌ Error creating user:', error)
        return
      }

      console.log('✅ Admin user created successfully!')
    }

    console.log('\n📋 Login Credentials:')
    console.log('   Email:    admin@worknest.co.ke')
    console.log('   Password: Admin@123')
    console.log('\n🔐 Password Hash:', passwordHash)
    console.log('\n🎉 You can now login to the admin panel!')

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

createAdminUser()

