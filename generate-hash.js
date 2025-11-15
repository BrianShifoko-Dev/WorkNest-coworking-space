// Generate proper bcrypt hash for Admin@123
const bcrypt = require('bcryptjs')

async function generateHash() {
  const password = 'Admin@123'
  const hash = await bcrypt.hash(password, 10)
  
  console.log('\n===========================================')
  console.log('Password:', password)
  console.log('Hash:', hash)
  console.log('===========================================\n')
  console.log('Copy this SQL and run in Supabase:\n')
  console.log(`DELETE FROM users WHERE email = 'admin@worknest.co.ke';`)
  console.log(``)
  console.log(`INSERT INTO users (email, password_hash, full_name, phone, role, status)`)
  console.log(`VALUES (`)
  console.log(`  'admin@worknest.co.ke',`)
  console.log(`  '${hash}',`)
  console.log(`  'WorkNest Administrator',`)
  console.log(`  '+254700000000',`)
  console.log(`  'manager',`)
  console.log(`  'active'`)
  console.log(`);`)
  console.log(``)
  console.log(`SELECT id, email, full_name, role FROM users WHERE email = 'admin@worknest.co.ke';`)
  console.log('\n===========================================\n')
}

generateHash()

