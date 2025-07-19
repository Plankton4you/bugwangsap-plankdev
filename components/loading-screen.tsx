"use client"

import { useState, useEffect } from "react"
import { Terminal } from "lucide-react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const steps = [
    "Initializing PlankXploit System...",
    "Loading kernel modules...",
    "Starting network services...",
    "Mounting file systems...",
    "Loading security protocols...",
    "Initializing exploit framework...",
    "Starting PlankXploit interface...",
    "System ready!",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        const stepIndex = Math.floor((newProgress / 100) * steps.length)
        if (stepIndex < steps.length) {
          setCurrentStep(steps[stepIndex])
        }
        return newProgress > 100 ? 100 : newProgress
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  // Try to play audio when loading screen mounts
  useEffect(() => {
    const tryPlayAudio = () => {
      const introAudio = document.getElementById("intro-audio") as HTMLAudioElement
      const bgAudio = document.getElementById("bg-audio") as HTMLAudioElement

      if (introAudio) {
        introAudio.volume = 0.8
        introAudio
          .play()
          .then(() => {
            console.log("🎵 Intro audio started!")

            introAudio.onended = () => {
              if (bgAudio) {
                bgAudio.volume = 0.3
                bgAudio.play().catch(console.error)
              }
            }
          })
          .catch((error) => {
            console.log("Audio blocked, will play on interaction:", error)

            const handleInteraction = () => {
              introAudio.play()
              document.removeEventListener("click", handleInteraction)
              document.removeEventListener("touchstart", handleInteraction)
            }

            document.addEventListener("click", handleInteraction)
            document.addEventListener("touchstart", handleInteraction)
          })
      }
    }

    // Small delay then try to play
    setTimeout(tryPlayAudio, 500)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-green-400 font-mono">
      {/* PlankXploit Logo */}
      <div className="mb-8 text-center">
        <div className="text-6xl font-bold mb-4 animate-pulse">
          <span className="text-green-400 glitch-text">PlankXploit</span>
        </div>
        <div className="text-xl text-green-300">Ethical Hacking Framework</div>
      </div>

      {/* Terminal Window */}
      <div className="bg-black/80 border border-green-400 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center mb-4">
          <Terminal className="w-5 h-5 mr-2" />
          <span className="text-green-400">PlankXploit Terminal</span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="text-green-300">Starting PlankXploit OS...</div>
          <div className="text-green-300">Version: 2.0.1 (Ethical Edition)</div>
          <div className="text-green-300">Developer: PlankDev</div>
          <div className="text-green-300">
            {">"} {currentStep}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center text-green-400">{progress}% Complete</div>
      </div>

      {/* Matrix Rain Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="matrix-rain" />
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

        .matrix-rain {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 255, 0, 0.1) 50%,
            transparent 100%
          );
          animation: rain 3s linear infinite;
        }

        @keyframes rain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  )
}
