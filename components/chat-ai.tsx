"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm PlankAI, your cybersecurity assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: generateAIResponse(inputText),
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("hack") || lowerInput.includes("exploit")) {
      return "I can help you with ethical hacking and cybersecurity concepts. Remember, always use these tools responsibly and only on systems you own or have permission to test."
    }

    if (lowerInput.includes("plankxploit")) {
      return "PlankXploit is an ethical hacking framework designed for cybersecurity professionals and students. It includes various tools for penetration testing and security assessment."
    }

    if (lowerInput.includes("ddos")) {
      return "DDoS (Distributed Denial of Service) attacks are used to overwhelm servers. In PlankXploit, this feature is for educational purposes only. Always ensure you have proper authorization before testing."
    }

    if (lowerInput.includes("help") || lowerInput.includes("how")) {
      return "I can assist you with cybersecurity questions, explain PlankXploit features, help with ethical hacking concepts, and provide guidance on security best practices. What specific topic would you like to explore?"
    }

    if (lowerInput.includes("code") || lowerInput.includes("programming")) {
      return "I can help you with coding questions related to cybersecurity, Python scripts, JavaScript exploits, and more. What programming challenge are you working on?"
    }

    return "That's an interesting question! As PlankAI, I'm here to help with cybersecurity, ethical hacking, and PlankXploit-related topics. Could you provide more details about what you'd like to know?"
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-4xl mx-auto bg-black/90 border-green-400 text-green-400 h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-center text-3xl flex items-center justify-center">
            <Bot className="w-8 h-8 mr-3" />
            PLANK AI ASSISTANT
          </CardTitle>
          <p className="text-center text-green-300">Your cybersecurity AI companion</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-black/50 rounded-lg border border-green-400">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-green-400 border border-green-400"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === "user" ? <User className="w-4 h-4 mr-2" /> : <Bot className="w-4 h-4 mr-2" />}
                    <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-green-400 border border-green-400 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    <span className="animate-pulse">PlankAI is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about cybersecurity..."
              className="flex-1 bg-black/50 border-green-400 text-green-400"
            />
            <Button onClick={handleSend} className="bg-green-600 hover:bg-green-700">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
