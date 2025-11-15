'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Search, CheckCircle, XCircle, Clock, Loader2, CreditCard } from 'lucide-react'
import { format } from 'date-fns'

interface Payment {
  id: string
  booking_id: string
  customer_id: string
  amount: number
  currency: string
  payment_method: string
  payment_status: string
  mpesa_receipt_number?: string
  mpesa_phone_number?: string
  transaction_date?: string
  created_at: string
}

export function PaymentsClient() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPayments()
  }, [statusFilter])

  const fetchPayments = async () => {
    setLoading(true)
    try {
      let url = '/api/payments?'
      if (statusFilter !== 'all') url += `status=${statusFilter}&`

      const response = await fetch(url)
      const data = await response.json()
      
      if (response.ok) {
        setPayments(Array.isArray(data) ? data : [])
      } else {
        console.error('Failed to load payments')
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const filteredPayments = payments.filter(payment =>
    (payment.mpesa_receipt_number?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (payment.mpesa_phone_number?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  // Stats
  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.payment_status === 'completed').length,
    failed: payments.filter(p => p.payment_status === 'failed').length,
    processing: payments.filter(p => p.payment_status === 'processing').length,
    totalRevenue: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0),
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Payments</h1>
          <p className="text-[#5C4033]/60 mt-1">View and manage all payments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Total Payments</p>
              <p className="text-2xl font-bold text-[#5C4033]">{stats.total}</p>
            </div>
            <CreditCard className="w-8 h-8 text-[#D4AF37]" />
          </div>
        </Card>
        <Card className="p-4 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Failed</p>
              <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Processing</p>
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
            </div>
            <Loader2 className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20 bg-gradient-to-br from-[#FFFFF0] to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Total Revenue</p>
              <p className="text-xl font-bold text-[#D4AF37]">KES {stats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-[#D4AF37]" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6 border-[#D4AF37]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4033]/60" />
              <Input
                placeholder="Search by receipt or phone..."
                className="pl-9 border-[#D4AF37]/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[#D4AF37]/30">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999]">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="border-[#D4AF37]/20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full"></div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-20 text-[#5C4033]/60">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-xl font-semibold">No payments found</p>
            <p className="text-sm mt-2">Payments will appear here when customers pay</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFFFF0] border-b border-[#D4AF37]/20">
                <tr>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Status</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Receipt</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Phone</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Amount</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Method</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-[#D4AF37]/10 hover:bg-[#FFFFF0]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.payment_status)}
                        <Badge className={`${getStatusColor(payment.payment_status)} border`}>
                          {payment.payment_status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#5C4033] font-mono text-sm">
                        {payment.mpesa_receipt_number || '—'}
                      </div>
                    </td>
                    <td className="p-4 text-[#5C4033]">
                      {payment.mpesa_phone_number || '—'}
                    </td>
                    <td className="p-4">
                      <div className="text-[#D4AF37] font-bold">
                        {payment.currency} {Number(payment.amount).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-blue-100 text-blue-700 border border-blue-300">
                        {payment.payment_method.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 text-[#5C4033]/60 text-sm">
                      <div>{format(new Date(payment.created_at), 'MMM d, yyyy')}</div>
                      <div className="text-xs">{format(new Date(payment.created_at), 'h:mm a')}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

