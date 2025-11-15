'use client'

import { useEffect, useState } from 'react'
import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Notification {
  id: string
  type: 'booking' | 'payment' | 'customer' | 'system' | 'info'
  title: string
  message: string
  link?: string
  is_read: boolean
  created_at: string
  target_role?: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchNotifications()

    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications(true) // Silent refresh
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async (silent = false) => {
    if (!silent) setLoading(true)
    
    try {
      // Get user from localStorage
      const userStr = localStorage.getItem('worknest_user')
      if (!userStr) return

      const user = JSON.parse(userStr)
      const role = user.role || 'staff'
      const userId = user.id

      const response = await fetch(`/api/notifications?userId=${userId}&role=${role}`)
      const data = await response.json()

      if (response.ok) {
        const sortedNotifications = Array.isArray(data) ? data : []
        setNotifications(sortedNotifications)
        
        const unread = sortedNotifications.filter(n => !n.is_read).length
        const previousUnread = unreadCount
        setUnreadCount(unread)

        // Show toast for new notifications (only if not first load and not silent)
        if (!silent && unread > previousUnread && previousUnread > 0) {
          toast.info(`You have ${unread - previousUnread} new notification(s)`)
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      if (!silent) setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
      })

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const userStr = localStorage.getItem('worknest_user')
      if (!userStr) return

      const user = JSON.parse(userStr)
      
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role: user.role }),
      })

      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
        setUnreadCount(0)
        toast.success('All notifications marked as read')
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id))
        toast.success('Notification deleted')
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    
    if (notification.link) {
      router.push(notification.link)
      setOpen(false)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return '📅'
      case 'payment':
        return '💳'
      case 'customer':
        return '👤'
      case 'system':
        return '⚙️'
      default:
        return '🔔'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'border-l-blue-500'
      case 'payment':
        return 'border-l-green-500'
      case 'customer':
        return 'border-l-purple-500'
      case 'system':
        return 'border-l-orange-500'
      default:
        return 'border-l-gray-500'
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5 text-[#5C4033]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[380px] max-h-[500px] overflow-hidden bg-white border-[#D4AF37]/20 p-0"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#D4AF37]/20 p-4 z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-[#5C4033] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#D4AF37]" />
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">
                {unreadCount} new
              </span>
            )}
          </div>
          {notifications.length > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="ghost"
              size="sm"
              className="w-full text-xs text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <CheckCheck className="w-3 h-3 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[400px]">
          {loading ? (
            <div className="p-8 text-center text-[#5C4033]/60">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mx-auto"></div>
              <p className="text-sm mt-2">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-[#5C4033]/60">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs mt-1">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-[#D4AF37]/10 hover:bg-[#FFFFF0]/50 transition-colors cursor-pointer border-l-4 ${getNotificationColor(
                  notification.type
                )} ${!notification.is_read ? 'bg-blue-50/30' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4
                        className={`text-sm font-semibold text-[#5C4033] ${
                          !notification.is_read ? 'font-bold' : ''
                        }`}
                      >
                        {notification.title}
                      </h4>
                      {!notification.is_read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    {notification.message && (
                      <p className="text-xs text-[#5C4033]/70 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#5C4033]/50">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                      <div className="flex gap-1">
                        {!notification.is_read && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs hover:bg-[#D4AF37]/10"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

