"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import VerificationScreen from "@/components/verification-screen"
import Dashboard from "@/components/dashboard"
import AudioManager from "@/components/audio-manager"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"loading" | "verification" | "dashboard">("loading")
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setCurrentScreen("verification")
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleVerificationComplete = () => {
    setIsVerified(true)
    setCurrentScreen("dashboard")
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover z-0">
        <source src="https://files.catbox.moe/kvnlgf.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/70 z-10" />

      {/* Audio Manager */}
      <AudioManager />

      {/* Content */}
      <div className="relative z-20">
        {currentScreen === "loading" && <LoadingScreen />}
        {currentScreen === "verification" && <VerificationScreen onComplete={handleVerificationComplete} />}
        {currentScreen === "dashboard" && <Dashboard />}
      </div>
    </div>
  )
}
