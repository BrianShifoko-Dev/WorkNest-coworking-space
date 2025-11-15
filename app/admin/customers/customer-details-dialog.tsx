'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Users,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  CreditCard,
  FileText,
  Save,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface CustomerDetailsDialogProps {
  customerId: string
  onClose: () => void
}

export function CustomerDetailsDialog({ customerId, onClose }: CustomerDetailsDialogProps) {
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    fetchCustomerDetails()
  }, [customerId])

  const fetchCustomerDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/customers/${customerId}`)
      const data = await response.json()
      
      if (response.ok) {
        setCustomer(data)
        setNotes(data.notes || '')
      } else {
        toast.error('Failed to load customer details')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error loading customer')
    } finally {
      setLoading(false)
    }
  }

  const saveNotes = async () => {
    setSavingNotes(true)
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customer,
          notes: notes
        })
      })

      if (response.ok) {
        toast.success('Notes saved successfully')
        fetchCustomerDetails()
      } else {
        toast.error('Failed to save notes')
      }
    } catch (error) {
      toast.error('Error saving notes')
    } finally {
      setSavingNotes(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#5C4033]">Customer Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
          </div>
        ) : customer ? (
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="p-6 border-[#D4AF37]/20">
              <h3 className="text-lg font-bold text-[#5C4033] mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs text-[#5C4033]/60">Full Name</p>
                    <p className="text-sm font-semibold text-[#5C4033]">{customer.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs text-[#5C4033]/60">Email</p>
                    <p className="text-sm font-semibold text-[#5C4033]">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs text-[#5C4033]/60">Phone</p>
                    <p className="text-sm font-semibold text-[#5C4033]">{customer.phone}</p>
                  </div>
                </div>
                {customer.company && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-xs text-[#5C4033]/60">Company</p>
                      <p className="text-sm font-semibold text-[#5C4033]">{customer.company}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs text-[#5C4033]/60">Customer Since</p>
                    <p className="text-sm font-semibold text-[#5C4033]">
                      {format(new Date(customer.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#5C4033]/60">Total Bookings</p>
                    <p className="text-2xl font-bold text-blue-600">{customer.stats.totalBookings}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </Card>
              <Card className="p-4 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#5C4033]/60">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{customer.stats.completedBookings}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </Card>
              <Card className="p-4 border-[#D4AF37]/20 bg-gradient-to-br from-[#FFFFF0] to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#5C4033]/60">Total Spent</p>
                    <p className="text-xl font-bold text-[#D4AF37]">KES {customer.stats.totalSpent.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </Card>
            </div>

            {/* Notes */}
            <Card className="p-6 border-[#D4AF37]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#5C4033] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  Notes
                </h3>
                <Button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                >
                  {savingNotes ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Notes
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this customer..."
                rows={4}
                className="border-[#D4AF37]/30"
              />
            </Card>

            {/* Booking History */}
            <Card className="p-6 border-[#D4AF37]/20">
              <h3 className="text-lg font-bold text-[#5C4033] mb-4">Booking History</h3>
              {customer.bookings.length === 0 ? (
                <p className="text-center py-8 text-[#5C4033]/60">No bookings yet</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {customer.bookings.map((booking: any) => (
                    <div key={booking.id} className="p-4 border border-[#D4AF37]/20 rounded-lg hover:bg-[#FFFFF0]/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#5C4033]">{booking.space?.name || 'Unknown Space'}</h4>
                          <p className="text-xs text-[#5C4033]/60 font-mono">{booking.receipt_number}</p>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)} border`}>
                          {booking.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                        <div className="flex items-center text-[#5C4033]/70">
                          <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                          {format(new Date(booking.start_datetime), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center text-[#5C4033]/70">
                          <Clock className="w-4 h-4 mr-2 text-[#D4AF37]" />
                          {format(new Date(booking.start_datetime), 'h:mm a')}
                        </div>
                        <div className="flex items-center text-[#5C4033]/70">
                          <Users className="w-4 h-4 mr-2 text-[#D4AF37]" />
                          {booking.number_of_people} people
                        </div>
                        <div className="flex items-center text-[#D4AF37] font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          KES {booking.total_amount?.toLocaleString()}
                        </div>
                      </div>
                      {booking.payment && booking.payment[0] && (
                        <div className="mt-3 pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between">
                          <Badge className="bg-green-100 text-green-700 border border-green-300">
                            <CreditCard className="w-3 h-3 mr-1" />
                            {booking.payment[0].payment_status.toUpperCase()}
                          </Badge>
                          {booking.payment[0].mpesa_receipt_number && (
                            <span className="text-xs text-[#5C4033]/60 font-mono">
                              {booking.payment[0].mpesa_receipt_number}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ) : (
          <p className="text-center py-10 text-red-600">Failed to load customer details</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

