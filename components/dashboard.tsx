"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, Phone, MessageCircle, Instagram, Globe, Video, Zap, Shield } from "lucide-react"
import Sidebar from "@/components/sidebar"
import TouchAnimation from "@/components/touch-animation"
import MessageDeveloper from "@/components/message-developer"
import ContentPage from "@/components/content-page"
import RatingPage from "@/components/rating-page"
import ChatAI from "@/components/chat-ai"
import SettingsPage from "@/components/settings-page"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [typingText, setTypingText] = useState("")
  const [showTouchAnimation, setShowTouchAnimation] = useState(false)
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState<"number" | "group" | "ddos">("number")
  const [groupTarget, setGroupTarget] = useState("")
  const [ddosTarget, setDdosTarget] = useState("")

  const fullText = "ATAU LU YANG GUA MASUKIN?Ahh Ahh"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypingText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const handleTouch = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTouchPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setShowTouchAnimation(true)
    setTimeout(() => setShowTouchAnimation(false), 1000)
  }

  const exploitFeatures = [
    {
      name: "Plankdevv Protox",
      command: "protox",
      description: "Advanced Protocol Exploit",
      type: "number",
      category: "Protocol Attack",
    },
    {
      name: "Protocol Hard",
      command: "protocol-hard",
      description: "Hard Protocol Attack",
      type: "number",
      category: "Protocol Attack",
    },
    {
      name: "Force Close",
      command: "forclose",
      description: "Force Application Closure",
      type: "number",
      category: "App Crash",
    },
    {
      name: "Crash WhatsApp",
      command: "crash-whatsapp",
      description: "WhatsApp Crash Exploit",
      type: "number",
      category: "App Crash",
    },
    {
      name: "Combox Protocol",
      command: "combox-protocol",
      description: "Combined Protocol Attack",
      type: "number",
      category: "Protocol Attack",
    },
    {
      name: "Super Hard",
      command: "super-hard",
      description: "Maximum Impact Exploit",
      type: "number",
      category: "Advanced Attack",
    },
    {
      name: "Invisible Harder",
      command: "invisharder",
      description: "Stealth Attack Mode",
      type: "number",
      category: "Stealth Attack",
    },
  ]

  const groupExploitFeatures = [
    {
      name: "Bug Group Freeze",
      command: "bug-group-freeze",
      description: "Freeze Group Chat Activity",
      type: "group",
      category: "Group Attack",
    },
    {
      name: "Kill Group",
      command: "killgroup",
      description: "Terminate Group Chat",
      type: "group",
      category: "Group Attack",
    },
    {
      name: "Group Force Close",
      command: "group-forclose",
      description: "Force Close Group Members",
      type: "group",
      category: "Group Attack",
    },
    {
      name: "Group Protocol Hard",
      command: "group-protocol-hard",
      description: "Hard Protocol Attack on Group",
      type: "group",
      category: "Group Attack",
    },
    {
      name: "Group Crash All",
      command: "group-crash-all",
      description: "Crash All Group Members",
      type: "group",
      category: "Group Attack",
    },
    {
      name: "Group Invisible Attack",
      command: "group-invisible",
      description: "Invisible Attack on Group",
      type: "group",
      category: "Group Attack",
    },
  ]

  const ddosFeatures = [
    {
      name: "HTTPS Flood",
      command: "ddos-https",
      description: "HTTPS Layer 7 Attack",
      type: "ddos",
      category: "Layer 7",
      icon: "🔒",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "TCP SYN Flood",
      command: "ddos-tcp",
      description: "TCP SYN Flood Attack",
      type: "ddos",
      category: "Layer 4",
      icon: "🌐",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      name: "UDP Flood",
      command: "ddos-udp",
      description: "UDP Packet Flood",
      type: "ddos",
      category: "Layer 4",
      icon: "📡",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      name: "HTTP Flood",
      command: "ddos-flood",
      description: "HTTP Request Flooding",
      type: "ddos",
      category: "Layer 7",
      icon: "🌊",
      color: "bg-cyan-600 hover:bg-cyan-700",
    },
    {
      name: "Bypass CloudFlare",
      command: "ddos-bypass-cf",
      description: "CloudFlare Protection Bypass",
      type: "ddos",
      category: "Bypass",
      icon: "☁️",
      color: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      name: "SQL Injection Attack",
      command: "ddos-sql",
      description: "SQL Injection + DDoS Combo",
      type: "ddos",
      category: "Database",
      icon: "🗃️",
      color: "bg-red-600 hover:bg-red-700",
    },
  ]

  const handleExploit = async (command: string, type: "number" | "group" | "ddos") => {
    if (type === "number") {
      if (!phoneNumber) {
        alert("MASUKIN NOMOR NYA DULU!")
        return
      }
      alert(`🎯 Executing ${command} on number: ${phoneNumber}...`)
    } else if (type === "group") {
      if (!groupTarget) {
        alert("MASUKIN GROUP LINK ATAU ID NYA DULU!")
        return
      }
      alert(`💥 Executing ${command} on group: ${groupTarget}...`)
    } else if (type === "ddos") {
      if (!ddosTarget) {
        alert("MASUKIN TARGET URL/IP NYA DULU!")
        return
      }
      alert(`⚡ Launching ${command} attack on: ${ddosTarget}...`)
    }

    // Simulate exploit execution with different messages
    const messages = {
      number: [
        "🔥 Initializing attack on target number...",
        "📡 Establishing connection...",
        "⚡ Sending exploit payload...",
        "💀 Target compromised successfully!",
      ],
      group: [
        "🎯 Scanning group members...",
        "🔍 Analyzing group structure...",
        "💣 Deploying group exploit...",
        "🏆 Group attack completed!",
      ],
      ddos: [
        "🚀 Initializing DDoS attack vectors...",
        "🔍 Scanning target infrastructure...",
        "⚡ Launching coordinated attack...",
        "💥 Target overwhelmed - Attack successful!",
      ],
    }

    for (const msg of messages[type]) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(msg)
    }
  }

  if (currentPage !== "dashboard") {
    return (
      <div className="min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />

        <div className="p-4">
          <Button onClick={() => setSidebarOpen(true)} className="mb-4 bg-green-600 hover:bg-green-700">
            <Menu className="w-5 h-5" />
          </Button>

          {currentPage === "message-developer" && <MessageDeveloper />}
          {currentPage === "content" && <ContentPage />}
          {currentPage === "rating" && <RatingPage />}
          {currentPage === "chat-ai" && <ChatAI />}
          {currentPage === "settings" && <SettingsPage />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative" onClick={handleTouch}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />

      {showTouchAnimation && <TouchAnimation x={touchPosition.x} y={touchPosition.y} />}

      <div className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Button onClick={() => setSidebarOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Menu className="w-5 h-5" />
          </Button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-400 glitch-text">PlankXploit</h1>
            <p className="text-green-300">Ethical Hacking Framework</p>
          </div>

          <div className="w-10" />
        </div>

        {/* Profile Section */}
        <Card className="bg-black/80 border-green-400 text-green-400">
          <CardContent className="p-6 text-center">
            <img
              src="/images/profile.jpg"
              alt="PlankDev"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-green-400"
            />

            {/* Dynamic input based on active tab */}
            {activeTab === "number" && (
              <>
                <div className="text-red-400 text-xl font-mono mb-4 animate-pulse">
                  <span className="glitch-text">MASUKIN NOMOR NYA!</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter WhatsApp Number..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mb-4 bg-black/50 border-green-400 text-green-400 placeholder-green-600"
                />
              </>
            )}

            {activeTab === "group" && (
              <>
                <div className="text-red-400 text-xl font-mono mb-4 animate-pulse">
                  <span className="glitch-text">MASUKIN GROUP LINK NYA!</span>
                </div>
                <Input
                  type="text"
                  placeholder="https://chat.whatsapp.com/... or Group ID"
                  value={groupTarget}
                  onChange={(e) => setGroupTarget(e.target.value)}
                  className="mb-4 bg-black/50 border-red-400 text-red-400 placeholder-red-600"
                />
              </>
            )}

            {activeTab === "ddos" && (
              <>
                <div className="text-red-400 text-xl font-mono mb-4 animate-pulse">
                  <span className="glitch-text">MASUKIN TARGET URL/IP NYA!</span>
                </div>
                <Input
                  type="text"
                  placeholder="https://example.com or 192.168.1.1"
                  value={ddosTarget}
                  onChange={(e) => setDdosTarget(e.target.value)}
                  className="mb-4 bg-black/50 border-purple-400 text-purple-400 placeholder-purple-600"
                />
              </>
            )}

            <div className="text-green-300 font-mono animate-pulse">{typingText}</div>
          </CardContent>
        </Card>

        {/* Exploit Features dengan Tabs */}
        <Card className="bg-black/80 border-green-400 text-green-400">
          <CardHeader>
            <CardTitle className="text-center text-2xl">🔥 EXPLOIT ARSENAL 🔥</CardTitle>

            {/* Tab Navigation */}
            <div className="flex justify-center space-x-2 mt-4 flex-wrap gap-2">
              <Button
                onClick={() => setActiveTab("number")}
                className={`px-4 py-2 ${
                  activeTab === "number"
                    ? "bg-green-600 text-white"
                    : "bg-transparent border border-green-400 text-green-400 hover:bg-green-400/20"
                }`}
              >
                📱 BUG NOMOR
              </Button>
              <Button
                onClick={() => setActiveTab("group")}
                className={`px-4 py-2 ${
                  activeTab === "group"
                    ? "bg-red-600 text-white"
                    : "bg-transparent border border-red-400 text-red-400 hover:bg-red-400/20"
                }`}
              >
                👥 BUG GROUP
              </Button>
              <Button
                onClick={() => setActiveTab("ddos")}
                className={`px-4 py-2 ${
                  activeTab === "ddos"
                    ? "bg-purple-600 text-white"
                    : "bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400/20"
                }`}
              >
                ⚡ DDOS ATTACK
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {activeTab === "number" && (
              <div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-green-400">📱 INDIVIDUAL NUMBER ATTACKS</h3>
                  <p className="text-green-300">Target specific WhatsApp numbers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exploitFeatures.map((feature, index) => (
                    <Button
                      key={index}
                      onClick={() => handleExploit(feature.command, "number")}
                      className="bg-green-600 hover:bg-green-700 text-white p-4 h-auto flex flex-col items-start relative group"
                    >
                      <div className="font-bold text-left">{feature.name}</div>
                      <div className="text-sm opacity-80 text-left">{feature.description}</div>
                      <div className="text-xs bg-green-800 px-2 py-1 rounded mt-2">{feature.category}</div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "group" && (
              <div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-red-400">👥 GROUP CHAT ATTACKS</h3>
                  <p className="text-red-300">Target WhatsApp group chats</p>

                  {/* Group Input */}
                  {/* <div className="mt-4 max-w-md mx-auto">
                    <label className="block text-red-400 mb-2">Group Link or ID:</label>
                    <Input
                      type="text"
                      placeholder="https://chat.whatsapp.com/... or Group ID"
                      value={groupTarget}
                      onChange={(e) => setGroupTarget(e.target.value)}
                      className="bg-black/50 border-red-400 text-red-400 placeholder-red-600"
                    />
                  </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupExploitFeatures.map((feature, index) => (
                    <Button
                      key={index}
                      onClick={() => handleExploit(feature.command, "group")}
                      className="bg-red-600 hover:bg-red-700 text-white p-4 h-auto flex flex-col items-start relative group"
                    >
                      <div className="font-bold text-left">{feature.name}</div>
                      <div className="text-sm opacity-80 text-left">{feature.description}</div>
                      <div className="text-xs bg-red-800 px-2 py-1 rounded mt-2">{feature.category}</div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "ddos" && (
              <div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-purple-400 flex items-center justify-center">
                    <Zap className="w-6 h-6 mr-2" />⚡ DDOS ATTACK ARSENAL
                  </h3>
                  <p className="text-purple-300">Distributed Denial of Service attacks</p>

                  {/* DDoS Target Input */}
                  {/* <div className="mt-4 max-w-md mx-auto">
                    <label className="block text-purple-400 mb-2">Target URL/IP:</label>
                    <Input
                      type="text"
                      placeholder="https://example.com or 192.168.1.1"
                      value={ddosTarget}
                      onChange={(e) => setDdosTarget(e.target.value)}
                      className="bg-black/50 border-purple-400 text-purple-400 placeholder-purple-600"
                    />
                  </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ddosFeatures.map((feature, index) => (
                    <Button
                      key={index}
                      onClick={() => handleExploit(feature.command, "ddos")}
                      className={`${feature.color} text-white p-4 h-auto flex flex-col items-start relative group transition-all duration-300`}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">{feature.icon}</span>
                        <div className="font-bold text-left">{feature.name}</div>
                      </div>
                      <div className="text-sm opacity-80 text-left mb-2">{feature.description}</div>
                      <div className="text-xs bg-black/30 px-2 py-1 rounded">{feature.category}</div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                    </Button>
                  ))}
                </div>

                {/* DDoS Warning */}
                <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-400 rounded-lg">
                  <div className="flex items-center text-yellow-400">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-bold">⚠️ ETHICAL USE WARNING</span>
                  </div>
                  <p className="text-yellow-300 text-sm mt-2">
                    DDoS attacks should only be used for authorized penetration testing and educational purposes.
                    Unauthorized attacks are illegal and can result in serious legal consequences.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="bg-black/80 border-green-400 text-green-400">
          <CardHeader>
            <CardTitle className="text-center">📞 CONTACT SUPPORT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button
                onClick={() => window.open("https://wa.me/08881382817", "_blank")}
                className="bg-green-600 hover:bg-green-700 flex flex-col items-center p-4"
              >
                <Phone className="w-6 h-6 mb-2" />
                WhatsApp
              </Button>

              <Button
                onClick={() => window.open("https://whatsapp.com/channel/0029Vay9jnG65yDFJDN6tG1j", "_blank")}
                className="bg-green-600 hover:bg-green-700 flex flex-col items-center p-4"
              >
                <MessageCircle className="w-6 h-6 mb-2" />
                Channel
              </Button>

              <Button
                onClick={() => window.open("https://www.instagram.com/anonymous_81bs?igsh=OHlhcWo5YnZiNTgz", "_blank")}
                className="bg-purple-600 hover:bg-purple-700 flex flex-col items-center p-4"
              >
                <Instagram className="w-6 h-6 mb-2" />
                Instagram
              </Button>

              <Button
                onClick={() => window.open("https://www.tiktok.com/@plankton_4you?_t=ZS-8tytCC9w0U3&_r=1", "_blank")}
                className="bg-pink-600 hover:bg-pink-700 flex flex-col items-center p-4"
              >
                <Video className="w-6 h-6 mb-2" />
                TikTok
              </Button>

              <Button
                onClick={() => window.open("https://planldev-kebutuhanhosting.vercel.app", "_blank")}
                className="bg-blue-600 hover:bg-blue-700 flex flex-col items-center p-4"
              >
                <Globe className="w-6 h-6 mb-2" />
                Website
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Developer Info */}
        <Card className="bg-black/80 border-green-400 text-green-400">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">👨‍💻 PENGEMBANG</h3>
            <div className="text-green-300">
              <p>• PlankDev (Development)</p>
              <p>• (Software Engineer)</p>
              <p>• (Cyber Security)</p>
              <p>• (Ethical)</p>
              <p>• (Exploiter)</p>
            </div>
          </CardContent>
        </Card>
      </div>

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
