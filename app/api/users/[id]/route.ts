import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'
import bcrypt from 'bcryptjs'

// GET single user
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, full_name, role, phone, created_at')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    console.log('👥 Updating user:', id)

    const updateData: any = {
      email: body.email,
      full_name: body.full_name,
      role: body.role,
      phone: body.phone || null,
    }

    // Only update password if provided
    if (body.password) {
      updateData.password_hash = await bcrypt.hash(body.password, 10)
    }

    const { data: user, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('id, email, full_name, role, phone, created_at')
      .single()

    if (error) {
      console.error('❌ Error updating user:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log activity
    await supabase.from('audit_logs').insert({
      user_id: id,
      action: 'user_updated',
      entity_type: 'user',
      entity_id: id,
      details: {
        email: user.email,
        role: user.role,
      },
    })

    console.log('✅ User updated:', id)
    return NextResponse.json(user)
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    console.log('👥 Deleting user:', id)

    // Prevent self-deletion (optional - check current user)
    // You can add logic here to prevent deleting the last admin, etc.

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Error deleting user:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log activity
    await supabase.from('audit_logs').insert({
      user_id: id,
      action: 'user_deleted',
      entity_type: 'user',
      entity_id: id,
      details: {
        deleted_at: new Date().toISOString(),
      },
    })

    console.log('✅ User deleted:', id)
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

