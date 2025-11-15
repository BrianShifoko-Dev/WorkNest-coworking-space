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
import { Mail, Search, Filter, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

interface EmailLog {
  id: string
  recipient_email: string
  sender_email: string
  email_subject: string
  email_type: string
  email_status: string
  error_message?: string
  booking_id?: string
  customer_id?: string
  sent_at?: string
  created_at: string
}

export function EmailsClient() {
  const [emails, setEmails] = useState<EmailLog[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchEmails()
  }, [statusFilter, typeFilter])

  const fetchEmails = async () => {
    setLoading(true)
    try {
      let url = '/api/emails?'
      if (statusFilter !== 'all') url += `status=${statusFilter}&`
      if (typeFilter !== 'all') url += `email_type=${typeFilter}&`

      const response = await fetch(url)
      const data = await response.json()
      
      if (response.ok) {
        setEmails(Array.isArray(data) ? data : [])
      } else {
        console.error('Failed to load emails')
      }
    } catch (error) {
      console.error('Error fetching emails:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking_confirmation':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'admin_notification':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'receipt':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const filteredEmails = emails.filter(email =>
    (email.recipient_email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (email.email_subject?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  // Stats
  const stats = {
    total: emails.length,
    sent: emails.filter(e => e.email_status === 'sent').length,
    failed: emails.filter(e => e.email_status === 'failed').length,
    pending: emails.filter(e => e.email_status === 'pending').length,
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Email Logs</h1>
          <p className="text-[#5C4033]/60 mt-1">View all sent emails and notifications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Total Emails</p>
              <p className="text-2xl font-bold text-[#5C4033]">{stats.total}</p>
            </div>
            <Mail className="w-8 h-8 text-[#D4AF37]" />
          </div>
        </Card>
        <Card className="p-4 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Sent</p>
              <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
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
        <Card className="p-4 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6 border-[#D4AF37]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4033]/60" />
              <Input
                placeholder="Search by email or subject..."
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
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="border-[#D4AF37]/30">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999]">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="booking_confirmation">Booking Confirmation</SelectItem>
                <SelectItem value="admin_notification">Admin Notification</SelectItem>
                <SelectItem value="receipt">Receipt</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Email Logs Table */}
      <Card className="border-[#D4AF37]/20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full"></div>
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="text-center py-20 text-[#5C4033]/60">
            <Mail className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-xl font-semibold">No emails found</p>
            <p className="text-sm mt-2">Emails will appear here when sent</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFFFF0] border-b border-[#D4AF37]/20">
                <tr>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Status</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Type</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">To</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Subject</th>
                  <th className="text-left p-4 text-[#5C4033] font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((email) => (
                  <tr key={email.id} className="border-b border-[#D4AF37]/10 hover:bg-[#FFFFF0]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(email.email_status)}
                        <Badge className={`${getStatusColor(email.email_status)} border`}>
                          {email.email_status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getTypeColor(email.email_type)} border`}>
                        {email.email_type?.replace('_', ' ') || 'general'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-[#5C4033] font-medium">{email.recipient_email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#5C4033]">{email.email_subject}</div>
                      {email.error_message && (
                        <div className="text-xs text-red-600 mt-1">⚠️ {email.error_message}</div>
                      )}
                    </td>
                    <td className="p-4 text-[#5C4033]/60 text-sm">
                      <div>{format(new Date(email.created_at), 'MMM d, yyyy')}</div>
                      <div className="text-xs">{format(new Date(email.created_at), 'h:mm a')}</div>
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

