"use client"

import { Button } from "@/components/ui/button"
import { X, Mail, Video, Star, Bot, Settings, Home } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onPageChange: (page: string) => void
  currentPage: string
}

export default function Sidebar({ isOpen, onClose, onPageChange, currentPage }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "message-developer", name: "Message Developer", icon: Mail },
    { id: "content", name: "Content", icon: Video },
    { id: "rating", name: "Rating", icon: Star },
    { id: "chat-ai", name: "Chat AI", icon: Bot },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute left-0 top-0 h-full w-80 bg-black/90 border-r border-green-400 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-green-400">MENU</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-green-400 hover:bg-green-400/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  onClose()
                }}
                className={`w-full justify-start text-left ${
                  currentPage === item.id
                    ? "bg-green-600 text-white"
                    : "bg-transparent text-green-400 hover:bg-green-400/20"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
