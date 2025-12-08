"use client"

import { useEffect, useState } from "react"
import localFont from "next/font/local"

const bebasNeueFont = localFont({
  src: [
    {
      path: "../../public/fonts/Bebas_Neue/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-bebas-neue"
})

export default function CountdownTimer({ textColor = "text-black" }: { textColor?: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date("2025-04-25T19:00:00") // April 25, 2025, 7:00 PM

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`${bebasNeueFont.variable} font-bebas text-2xl tracking-tight ${textColor}`}>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <span>{timeLeft.days}</span>
          <span className="text-xs">DAYS</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className="text-xs">HOURS</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className="text-xs">MINUTES</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <span className="text-xs">SECONDS</span>
        </div>
      </div>
    </div>
  )
} 