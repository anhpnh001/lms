'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'
import TourGuide from '@/components/TourGuide'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [startTour, setStartTour] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const tourSeen = localStorage.getItem('tourSeen')
    if (!tourSeen) {
      setStartTour(true)
      localStorage.setItem('tourSeen', 'true')
    }
    setLoaded(true)
  }, [])

  const handleStartTour = () => {
    setStartTour(true)
  }
  const handleTourEnd = () => {
    setStartTour(false)
  }
  if (!loaded) {
    return null
  }
  return (
    <div className="min-h-screen">
      {startTour && (
        <TourGuide
          start={startTour}
          setStartTour={setStartTour}
          onTourEnd={handleTourEnd}
        />
      )}
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  )
}
