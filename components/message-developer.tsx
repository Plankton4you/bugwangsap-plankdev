"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Terminal } from "lucide-react"

export default function MessageDeveloper() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!name || !email || !message) {
      alert("Please fill all fields!")
      return
    }

    setSending(true)

    // Simulate sending email
    try {
      // Here you would implement actual email sending to lupinter33@gmail.com
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Message sent successfully!")
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      alert("Failed to send message. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-4xl mx-auto bg-black/90 border-green-400 text-green-400">
        <CardHeader>
          <CardTitle className="text-center text-3xl flex items-center justify-center">
            <Terminal className="w-8 h-8 mr-3" />
            MESSAGE DEVELOPER
          </CardTitle>
          <p className="text-center text-green-300">Send a message directly to PlankDev</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Terminal-like interface */}
          <div className="bg-black border border-green-400 rounded-lg p-4 font-mono">
            <div className="text-green-400 mb-2">root@plankxploit:~$ contact_developer</div>
            <div className="text-green-300">Initializing secure communication channel...</div>
            <div className="text-green-300">Target: lupinter33@gmail.com</div>
            <div className="text-green-300">Status: Ready for input</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-400 mb-2">Name:</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                className="bg-black/50 border-green-400 text-green-400"
              />
            </div>

            <div>
              <label className="block text-green-400 mb-2">Email:</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email..."
                className="bg-black/50 border-green-400 text-green-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-400 mb-2">Message:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              className="bg-black/50 border-green-400 text-green-400"
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={sending}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
          >
            <Send className="w-5 h-5 mr-2" />
            {sending ? "SENDING..." : "SEND MESSAGE"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
