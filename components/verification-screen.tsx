"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ExternalLink } from "lucide-react"

interface VerificationScreenProps {
  onComplete: () => void
}

export default function VerificationScreen({ onComplete }: VerificationScreenProps) {
  const [verifiedItems, setVerifiedItems] = useState<string[]>([])

  const socialMediaLinks = [
    {
      id: "whatsapp1",
      name: "WhatsApp Channel 1",
      url: "https://whatsapp.com/channel/0029Vay9jnG65yDFJDN6tG1j",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "whatsapp2",
      name: "WhatsApp Channel 2",
      url: "https://whatsapp.com/channel/0029Vb2QKduA89MpcV9yGr1z",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "marga",
      name: "Marga Group",
      url: "https://chat.whatsapp.com/Fqkb8bwnCUU9ZAyQXHljBY?mode=ac_c",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "tiktok",
      name: "TikTok",
      url: "https://www.tiktok.com/@plankton_4you?_t=ZS-8tytCC9w0U3&_r=1",
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/plankton4you.dev/",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  const handleSocialClick = (id: string, url: string) => {
    window.open(url, "_blank")
    if (!verifiedItems.includes(id)) {
      setVerifiedItems([...verifiedItems, id])
    }
  }

  const allVerified = verifiedItems.length === socialMediaLinks.length

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-black/90 border-green-400 text-green-400">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-4">
            <span className="glitch-text text-green-400">VERIFICATION REQUIRED</span>
          </CardTitle>
          <div className="text-red-400 text-lg font-mono animate-pulse">⚠️ SYSTEM ACCESS RESTRICTED ⚠️</div>
          <p className="text-green-300 mt-4">Follow all social media accounts to gain access to PlankXploit</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {socialMediaLinks.map((social) => (
            <Button
              key={social.id}
              onClick={() => handleSocialClick(social.id, social.url)}
              className={`w-full ${social.color} text-white font-mono relative`}
              size="lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {social.name}
              {verifiedItems.includes(social.id) && <Check className="w-5 h-5 ml-auto text-green-400" />}
            </Button>
          ))}

          <div className="mt-8 text-center">
            <div className="text-green-300 mb-4">
              Verified: {verifiedItems.length}/{socialMediaLinks.length}
            </div>

            <Button
              onClick={onComplete}
              disabled={!allVerified}
              className={`w-full text-xl font-bold py-4 ${
                allVerified
                  ? "bg-green-600 hover:bg-green-700 text-white animate-pulse"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {allVerified ? "🚀 ENTER PLANKXPLOIT 🚀" : "🔒 COMPLETE VERIFICATION"}
            </Button>
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
