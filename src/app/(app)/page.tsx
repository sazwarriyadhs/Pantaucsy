"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AppPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/announcements')
  }, [router])

  return null // Return null while the redirect happens
}
