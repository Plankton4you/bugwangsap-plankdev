"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Settings, User, Shield, Volume2, Eye } from "lucide-react"

export default function SettingsPage() {
  const [username, setUsername] = useState("PlankUser")
  const [email, setEmail] = useState("")
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-4xl mx-auto bg-black/90 border-green-400 text-green-400">
        <CardHeader>
          <CardTitle className="text-center text-3xl flex items-center justify-center">
            <Settings className="w-8 h-8 mr-3" />
            ACCOUNT SETTINGS
          </CardTitle>
          <p className="text-center text-green-300">Customize your PlankXploit experience</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Profile Settings */}
          <Card className="bg-black/50 border-green-400">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <User className="w-6 h-6 mr-2" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-green-400 mb-2">Username:</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/50 border-green-400 text-green-400"
                />
              </div>

              <div>
                <label className="block text-green-400 mb-2">Email:</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-black/50 border-green-400 text-green-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-black/50 border-green-400">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Shield className="w-6 h-6 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <span>Auto-logout after inactivity</span>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <span>Secure connection only</span>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>

          {/* Application Settings */}
          <Card className="bg-black/50 border-green-400">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Eye className="w-6 h-6 mr-2" />
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Background Audio
                </span>
                <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <span>Auto-save Settings</span>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-900/20 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl">⚠️ Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                Reset All Settings
              </Button>

              <Button variant="destructive" className="w-full bg-red-800 hover:bg-red-900">
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
            💾 SAVE SETTINGS
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
