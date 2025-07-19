"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import VerificationScreen from "@/components/verification-screen"
import Dashboard from "@/components/dashboard"
import AudioManager from "@/components/audio-manager"
import PermissionNotification from "@/components/permission-notification"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"loading" | "verification" | "dashboard">("loading")
  const [isVerified, setIsVerified] = useState(false)
  const [showPermissionBar, setShowPermissionBar] = useState(true)

  const handlePermissionsHandled = () => {
    setShowPermissionBar(false)
  }

  useEffect(() => {
    if (currentScreen === "loading") {
      // Simulate loading time
      const timer = setTimeout(() => {
        setCurrentScreen("verification")
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  const handleVerificationComplete = () => {
    setIsVerified(true)
    setCurrentScreen("dashboard")
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Permission Notification Bar */}
      {showPermissionBar && <PermissionNotification onPermissionsHandled={handlePermissionsHandled} />}

      {/* Background Video */}
      <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover z-0">
        <source src="/video/background.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/70 z-10" />

      {/* Audio Manager - INI YANG HILANG! */}
      <AudioManager />

      {/* Content */}
      <div className={`relative z-20 ${showPermissionBar ? "pt-16 md:pt-20" : ""}`}>
        {currentScreen === "loading" && <LoadingScreen />}
        {currentScreen === "verification" && <VerificationScreen onComplete={handleVerificationComplete} />}
        {currentScreen === "dashboard" && <Dashboard />}
      </div>
    </div>
  )
}
