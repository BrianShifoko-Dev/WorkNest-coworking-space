'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings as SettingsIcon, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { BusinessSettings } from './business-settings'
import { OperatingHoursSettings } from './operating-hours-settings'
import { SystemSettings } from './system-settings'
import { UserManagement } from './user-management'

export function SettingsClient() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changes, setChanges] = useState<any>({})

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      
      if (response.ok) {
        setSettings(data)
      } else {
        toast.error('Failed to load settings')
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Error loading settings')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (key: string, value: any) => {
    setChanges((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const saveSettings = async () => {
    if (Object.keys(changes).length === 0) {
      toast.info('No changes to save')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`${data.updated.length} settings updated successfully`)
        setChanges({})
        fetchSettings()
      } else {
        toast.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#5C4033]">Settings</h1>
            <p className="text-[#5C4033]/60 mt-1">Manage system configuration</p>
          </div>
        </div>
        <Button
          onClick={saveSettings}
          disabled={saving || Object.keys(changes).length === 0}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes {Object.keys(changes).length > 0 && `(${Object.keys(changes).length})`}
            </>
          )}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
        </div>
      ) : settings ? (
        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="bg-[#FFFFF0] border border-[#D4AF37]/20">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="hours">Operating Hours</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <BusinessSettings
              settings={settings}
              changes={changes}
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="hours">
            <OperatingHoursSettings
              settings={settings}
              changes={changes}
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="system">
            <SystemSettings
              settings={settings}
              changes={changes}
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="p-20 text-center border-[#D4AF37]/20">
          <SettingsIcon className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/30" />
          <p className="text-xl font-semibold text-[#5C4033]">Failed to load settings</p>
          <p className="text-sm text-[#5C4033]/60 mt-2">Please refresh the page</p>
        </Card>
      )}
    </div>
  )
}

