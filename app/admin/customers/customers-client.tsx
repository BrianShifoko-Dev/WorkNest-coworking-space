'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  Building2,
  Calendar,
  DollarSign,
  Download
} from 'lucide-react'
import { format } from 'date-fns'
import { CustomerDetailsDialog } from './customer-details-dialog'

interface Customer {
  id: string
  full_name: string
  email: string
  phone: string
  company?: string
  notes?: string
  created_at: string
}

export function CustomersClient() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  useEffect(() => {
    fetchCustomers()
  }, [searchQuery])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      let url = '/api/customers'
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`
      }

      const response = await fetch(url)
      const data = await response.json()
      
      if (response.ok) {
        setCustomers(Array.isArray(data) ? data : [])
      } else {
        console.error('Failed to load customers')
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const csvData = [
      ['Name', 'Email', 'Phone', 'Company', 'Joined Date'],
      ...customers.map(c => [
        c.full_name,
        c.email,
        c.phone,
        c.company || '',
        format(new Date(c.created_at), 'yyyy-MM-dd')
      ])
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `worknest-customers-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Customers</h1>
          <p className="text-[#5C4033]/60 mt-1">View and manage all customers</p>
        </div>
        <Button
          onClick={exportToCSV}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
          disabled={customers.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Card */}
      <Card className="p-6 mb-6 border-[#D4AF37]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#5C4033]/60">Total Customers</p>
              <p className="text-2xl font-bold text-[#5C4033]">{customers.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#5C4033]/60">New This Month</p>
              <p className="text-2xl font-bold text-[#5C4033]">
                {customers.filter(c => {
                  const created = new Date(c.created_at)
                  const now = new Date()
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#5C4033]/60">With Company</p>
              <p className="text-2xl font-bold text-[#5C4033]">
                {customers.filter(c => c.company).length}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4 mb-6 border-[#D4AF37]/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C4033]/60" />
          <Input
            placeholder="Search by name, email, or phone..."
            className="pl-10 border-[#D4AF37]/30 focus-visible:ring-[#D4AF37]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Customers Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full"></div>
        </div>
      ) : customers.length === 0 ? (
        <Card className="p-20 text-center border-[#D4AF37]/20">
          <Users className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/30" />
          <p className="text-xl font-semibold text-[#5C4033]">No customers found</p>
          <p className="text-sm text-[#5C4033]/60 mt-2">
            {searchQuery ? 'Try a different search term' : 'Customers will appear here when bookings are made'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <Card key={customer.id} className="p-6 border-[#D4AF37]/20 hover:shadow-lg transition-all hover:border-[#D4AF37]/40">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[#5C4033] mb-1">{customer.full_name}</h3>
                  {customer.company && (
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-300 mb-2">
                      <Building2 className="w-3 h-3 mr-1" />
                      {customer.company}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-[#5C4033]/70">
                  <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center text-sm text-[#5C4033]/70">
                  <Phone className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  {customer.phone}
                </div>
                <div className="flex items-center text-sm text-[#5C4033]/70">
                  <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Joined {format(new Date(customer.created_at), 'MMM d, yyyy')}
                </div>
              </div>

              <Button
                onClick={() => setSelectedCustomer(customer.id)}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <CustomerDetailsDialog
          customerId={selectedCustomer}
          onClose={() => {
            setSelectedCustomer(null)
            fetchCustomers()
          }}
        />
      )}
    </div>
  )
}

