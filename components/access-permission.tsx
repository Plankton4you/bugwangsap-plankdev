"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Smartphone, Camera, Shield, AlertTriangle } from "lucide-react"

interface AccessPermissionProps {
  onPermissionsGranted: () => void
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

export default function AccessPermission({ onPermissionsGranted }: AccessPermissionProps) {
  const [permissionStatus, setPermissionStatus] = useState({
    location: false,
    camera: false,
    device: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string>("")

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
  }

  // Request location permission
  const requestLocationPermission = () => {
    return new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"))
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
          resolve()
        },
        (error) => {
          reject(new Error(`Location access denied: ${error.message}`))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    })
  }

  // Request camera permission
  const requestCameraPermission = () => {
    return new Promise<void>((resolve, reject) => {
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
          setCameraStream(stream)
          setPermissionStatus((prev) => ({ ...prev, camera: true }))

          // Take a screenshot after 2 seconds
          setTimeout(() => {
            capturePhoto(stream)
          }, 2000)

          resolve()
        })
        .catch((error) => {
          reject(new Error(`Camera access denied: ${error.message}`))
        })
    })
  }

  // Capture photo from camera stream
  const capturePhoto = (stream: MediaStream) => {
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

        // Store the captured image (in real app, this would be sent to server)
        console.log("📸 Photo captured:", imageData.substring(0, 50) + "...")

        // Stop the stream after capturing
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }

  // Request all permissions
  const requestAllPermissions = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Collect device info first (always available)
      collectDeviceInfo()

      // Request location permission
      await requestLocationPermission()

      // Request camera permission
      await requestCameraPermission()

      // All permissions granted
      setTimeout(() => {
        onPermissionsGranted()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Permission request failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-request permissions on component mount
  useEffect(() => {
    // Small delay to show the interface first
    const timer = setTimeout(() => {
      requestAllPermissions()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-2xl bg-black/90 border-red-400 text-red-400">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-4">
            <span className="glitch-text text-red-400">🔒 SYSTEM ACCESS REQUIRED</span>
          </CardTitle>
          <div className="text-yellow-400 text-lg font-mono animate-pulse">⚠️ REQUESTING DEVICE PERMISSIONS ⚠️</div>
          <p className="text-red-300 mt-4">PlankXploit requires access to your device for security verification</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Permission Status */}
          <div className="space-y-4">
            <div
              className={`flex items-center p-3 rounded-lg border ${
                permissionStatus.device ? "border-green-400 bg-green-900/20" : "border-yellow-400 bg-yellow-900/20"
              }`}
            >
              <Smartphone className="w-6 h-6 mr-3" />
              <div className="flex-1">
                <div className="font-bold">Device Information</div>
                <div className="text-sm opacity-80">System specs and browser data</div>
              </div>
              <div className={`text-sm font-bold ${permissionStatus.device ? "text-green-400" : "text-yellow-400"}`}>
                {permissionStatus.device ? "✅ GRANTED" : "⏳ PENDING"}
              </div>
            </div>

            <div
              className={`flex items-center p-3 rounded-lg border ${
                permissionStatus.location ? "border-green-400 bg-green-900/20" : "border-yellow-400 bg-yellow-900/20"
              }`}
            >
              <MapPin className="w-6 h-6 mr-3" />
              <div className="flex-1">
                <div className="font-bold">Location Access</div>
                <div className="text-sm opacity-80">GPS coordinates and geolocation</div>
              </div>
              <div className={`text-sm font-bold ${permissionStatus.location ? "text-green-400" : "text-yellow-400"}`}>
                {permissionStatus.location ? "✅ GRANTED" : "⏳ PENDING"}
              </div>
            </div>

            <div
              className={`flex items-center p-3 rounded-lg border ${
                permissionStatus.camera ? "border-green-400 bg-green-900/20" : "border-yellow-400 bg-yellow-900/20"
              }`}
            >
              <Camera className="w-6 h-6 mr-3" />
              <div className="flex-1">
                <div className="font-bold">Camera Access</div>
                <div className="text-sm opacity-80">Photo capture for verification</div>
              </div>
              <div className={`text-sm font-bold ${permissionStatus.camera ? "text-green-400" : "text-yellow-400"}`}>
                {permissionStatus.camera ? "✅ GRANTED" : "⏳ PENDING"}
              </div>
            </div>
          </div>

          {/* Device Info Display */}
          {deviceInfo && (
            <div className="bg-black/50 border border-green-400 rounded-lg p-4">
              <h3 className="text-green-400 font-bold mb-2">📱 Device Information Collected:</h3>
              <div className="text-green-300 text-sm space-y-1 font-mono">
                <div>Platform: {deviceInfo.platform}</div>
                <div>Language: {deviceInfo.language}</div>
                <div>Screen: {deviceInfo.screenResolution}</div>
                <div>Timezone: {deviceInfo.timezone}</div>
                <div>Online: {deviceInfo.onlineStatus ? "Yes" : "No"}</div>
              </div>
            </div>
          )}

          {/* Location Info Display */}
          {locationInfo && (
            <div className="bg-black/50 border border-blue-400 rounded-lg p-4">
              <h3 className="text-blue-400 font-bold mb-2">📍 Location Information Collected:</h3>
              <div className="text-blue-300 text-sm space-y-1 font-mono">
                <div>Latitude: {locationInfo.latitude.toFixed(6)}</div>
                <div>Longitude: {locationInfo.longitude.toFixed(6)}</div>
                <div>Accuracy: {locationInfo.accuracy.toFixed(0)}m</div>
                <div>Timestamp: {new Date(locationInfo.timestamp).toLocaleString()}</div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/30 border border-red-400 rounded-lg p-4">
              <div className="flex items-center text-red-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-bold">Permission Error</span>
              </div>
              <p className="text-red-300 text-sm mt-2">{error}</p>
              <Button onClick={requestAllPermissions} className="mt-3 bg-red-600 hover:bg-red-700" disabled={isLoading}>
                🔄 Retry Permissions
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center">
              <div className="text-yellow-400 font-mono animate-pulse">
                🔍 Scanning device and requesting permissions...
              </div>
              <div className="mt-2 text-yellow-300 text-sm">Please allow all permission requests to continue</div>
            </div>
          )}

          {/* Success State */}
          {permissionStatus.device && permissionStatus.location && permissionStatus.camera && (
            <div className="text-center">
              <div className="text-green-400 font-bold text-xl animate-pulse">✅ ALL PERMISSIONS GRANTED</div>
              <div className="text-green-300 text-sm mt-2">Redirecting to PlankXploit dashboard...</div>
            </div>
          )}

          {/* Manual Grant Button */}
          {!isLoading && (!permissionStatus.device || !permissionStatus.location || !permissionStatus.camera) && (
            <Button
              onClick={requestAllPermissions}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
              disabled={isLoading}
            >
              <Shield className="w-5 h-5 mr-2" />
              GRANT ALL PERMISSIONS
            </Button>
          )}

          {/* Warning */}
          <div className="bg-yellow-900/30 border border-yellow-400 rounded-lg p-4">
            <div className="flex items-center text-yellow-400">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="font-bold">⚠️ SECURITY NOTICE</span>
            </div>
            <p className="text-yellow-300 text-sm mt-2">
              This application requires device access for security verification and ethical hacking framework
              initialization. All data is processed locally for educational purposes only.
            </p>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .glitch-text {
          animation: glitch 2s infinite;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  )
}
