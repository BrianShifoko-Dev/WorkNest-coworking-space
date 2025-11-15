'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, UserPlus, Shield, Edit, Trash2, Loader2, Mail, Phone, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { AddUserDialog } from './add-user-dialog'
import { EditUserDialog } from './edit-user-dialog'

interface User {
  id: string
  email: string
  full_name: string
  role: string
  phone?: string
  created_at: string
}

export function UsersClient() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      
      if (response.ok) {
        setUsers(Array.isArray(data) ? data : [])
      } else {
        toast.error('Failed to load users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Error loading users')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('User deleted successfully')
        fetchUsers()
      } else {
        toast.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Error deleting user')
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'manager':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'accountant':
        return 'bg-[#D4AF37]/20 text-[#5C4033] border-[#D4AF37]'
      case 'reception':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'staff':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getRolePermissions = (role: string) => {
    switch (role.toLowerCase()) {
      case 'manager':
        return 'Full access to all features'
      case 'accountant':
        return 'Financial data: Payments, Reports, Bookings (read-only)'
      case 'reception':
        return 'Bookings, Customers, Payments (read/create)'
      case 'staff':
        return 'View bookings and customer information'
      default:
        return 'Limited access'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#5C4033]">User Management</h1>
            <p className="text-[#5C4033]/60 mt-1">Manage admin users and their permissions</p>
          </div>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Total Users</p>
              <p className="text-2xl font-bold text-[#5C4033]">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-[#D4AF37]" />
          </div>
        </Card>
        <Card className="p-4 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Managers</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role.toLowerCase() === 'manager').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Reception</p>
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role.toLowerCase() === 'reception').length}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Role Permissions Info */}
      <Card className="p-6 mb-6 border-[#D4AF37]/20 bg-[#FFFFF0]">
        <h3 className="font-semibold text-[#5C4033] mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#D4AF37]" />
          Role Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white border border-purple-200 rounded-lg">
            <Badge className="bg-purple-100 text-purple-700 border-purple-300 mb-2">MANAGER</Badge>
            <p className="text-sm text-[#5C4033]/70">Full access to all features including settings, reports, and user management</p>
          </div>
          <div className="p-3 bg-white border border-blue-200 rounded-lg">
            <Badge className="bg-blue-100 text-blue-700 border-blue-300 mb-2">RECEPTION</Badge>
            <p className="text-sm text-[#5C4033]/70">Can manage bookings, customers, and payments. View-only for reports</p>
          </div>
          <div className="p-3 bg-white border border-green-200 rounded-lg">
            <Badge className="bg-green-100 text-green-700 border-green-300 mb-2">STAFF</Badge>
            <p className="text-sm text-[#5C4033]/70">View-only access to bookings and customer information</p>
          </div>
        </div>
      </Card>

      {/* Users List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
        </div>
      ) : users.length === 0 ? (
        <Card className="p-20 text-center border-[#D4AF37]/20">
          <Users className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/30" />
          <p className="text-xl font-semibold text-[#5C4033]">No users found</p>
          <p className="text-sm text-[#5C4033]/60 mt-2 mb-4">Add your first admin user to get started</p>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add First User
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="p-6 border-[#D4AF37]/20 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[#5C4033] mb-2">{user.full_name}</h3>
                  <Badge className={`${getRoleBadge(user.role)} border`}>
                    {user.role.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-[#5C4033]/70">
                  <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center text-sm text-[#5C4033]/70">
                    <Phone className="w-4 h-4 mr-2 text-[#D4AF37]" />
                    {user.phone}
                  </div>
                )}
                <div className="flex items-center text-sm text-[#5C4033]/70">
                  <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Joined {format(new Date(user.created_at), 'MMM d, yyyy')}
                </div>
              </div>

              <div className="p-3 bg-[#FFFFF0] rounded-lg mb-4">
                <p className="text-xs text-[#5C4033]/70">
                  {getRolePermissions(user.role)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setEditingUser(user)}
                  variant="outline"
                  className="flex-1 border-[#D4AF37]/30 text-[#5C4033] hover:bg-[#D4AF37]/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(user.id, user.full_name)}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add User Dialog */}
      {showAddDialog && (
        <AddUserDialog
          onClose={() => {
            setShowAddDialog(false)
            fetchUsers()
          }}
        />
      )}

      {/* Edit User Dialog */}
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          onClose={() => {
            setEditingUser(null)
            fetchUsers()
          }}
        />
      )}
    </div>
  )
}

