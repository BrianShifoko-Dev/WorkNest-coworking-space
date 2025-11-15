'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit, Trash2, Building2 } from 'lucide-react'
import { toast } from 'sonner'
import { CreateSpaceDialog } from './create-space-dialog'
import { EditSpaceDialog } from './edit-space-dialog'

interface Space {
  id: string
  name: string
  type: string
  description: string
  capacity: number
  hourly_rate: number
  daily_rate: number
  weekly_rate: number
  monthly_rate: number
  status: string
  created_at: string
}

export function SpacesClient() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingSpace, setEditingSpace] = useState<Space | null>(null)

  useEffect(() => {
    fetchSpaces()
  }, [])

  const fetchSpaces = async () => {
    try {
      const response = await fetch('/api/spaces')
      const data = await response.json()
      
      if (response.ok) {
        setSpaces(Array.isArray(data) ? data : [])
      } else {
        toast.error('Failed to load spaces')
      }
    } catch (error) {
      console.error('Error fetching spaces:', error)
      toast.error('Error loading spaces')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this space?')) return

    try {
      const response = await fetch(`/api/spaces/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Space deleted successfully')
        fetchSpaces()
      } else {
        toast.error('Failed to delete space')
      }
    } catch (error) {
      console.error('Error deleting space:', error)
      toast.error('Error deleting space')
    }
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      office: 'bg-blue-100 text-blue-700',
      boardroom: 'bg-purple-100 text-purple-700',
      event_space: 'bg-green-100 text-green-700',
      call_pod: 'bg-orange-100 text-orange-700',
      restaurant_table: 'bg-pink-100 text-pink-700'
    }
    return colors[type] || 'bg-gray-100 text-gray-700'
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available: 'bg-green-100 text-green-700',
      maintenance: 'bg-yellow-100 text-yellow-700',
      disabled: 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#5C4033]/60">Loading spaces...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#5C4033]">Spaces</h1>
          <p className="text-[#5C4033]/60">Manage your bookable spaces (Add via SQL for now)</p>
        </div>
        {/* Temporarily disabled - Add spaces via SQL first */}
        {/* <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Space
        </Button> */}
      </div>

      {/* Spaces Grid */}
      {spaces.length === 0 ? (
        <Card className="p-12 text-center border-[#D4AF37]/20">
          <Building2 className="w-12 h-12 mx-auto text-[#D4AF37] mb-4" />
          <h3 className="text-lg font-semibold text-[#5C4033] mb-2">No spaces yet</h3>
          <p className="text-[#5C4033]/60 mb-4">Add spaces via SQL (ADD-SPACES-FOR-BOOKING.sql)</p>
          {/* Temporarily disabled - Add spaces via SQL first */}
          {/* <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Space
          </Button> */}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <Card key={space.id} className="p-6 border-[#D4AF37]/20 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#5C4033] mb-1">{space.name}</h3>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(space.type)}`}>
                      {space.type.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(space.status)}`}>
                      {space.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingSpace(space)}
                    className="p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(space.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-[#5C4033]/70 mb-4 line-clamp-2">
                {space.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5C4033]/60">Capacity:</span>
                  <span className="font-medium text-[#5C4033]">{space.capacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C4033]/60">Hourly:</span>
                  <span className="font-medium text-[#5C4033]">
                    {space.hourly_rate ? `KSh ${space.hourly_rate.toLocaleString()}` : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C4033]/60">Daily:</span>
                  <span className="font-medium text-[#5C4033]">
                    {space.daily_rate ? `KSh ${space.daily_rate.toLocaleString()}` : '-'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      {showCreateDialog && (
        <CreateSpaceDialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onSuccess={() => {
            setShowCreateDialog(false)
            fetchSpaces()
          }}
        />
      )}

      {editingSpace && (
        <EditSpaceDialog
          open={!!editingSpace}
          space={editingSpace}
          onClose={() => setEditingSpace(null)}
          onSuccess={() => {
            setEditingSpace(null)
            fetchSpaces()
          }}
        />
      )}
    </div>
  )
}

