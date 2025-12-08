"use client"

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/images/backvidsec.mp4" type="video/mp4" />
    </video>
  )
} 