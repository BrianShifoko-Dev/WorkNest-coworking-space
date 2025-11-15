'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function MenuClient() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to restaurant page
    router.replace('/restaurant')
  }, [router])

  return null
}
