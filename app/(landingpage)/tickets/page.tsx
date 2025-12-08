'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Analytics, track } from '@vercel/analytics/react'

export default function TicketsPage() {
  const router = useRouter()

  useEffect(() => {
    // Track the redirect
    track('TicketRedirect', {
      source: 'direct_url',
      destination: 'dice.fm'
    })
    
    // Redirect after tracking
    router.push('https://dice.fm/event/eoq3wo-sperm-racing-la-25th-apr-la-center-studios-los-angeles-tickets')
  }, [router])

  return (
    <>
      <Analytics />
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Redirecting to tickets...</p>
      </div>
    </>
  )
} 