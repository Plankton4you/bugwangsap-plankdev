"use client"

import { useEffect, useRef } from "react"

export default function AudioManager() {
  const introRef = useRef<HTMLAudioElement>(null)
  const bgRef = useRef<HTMLAudioElement>(null)

  // Try to play; if blocked, try again on first user interaction
  const playSequence = async () => {
    const intro = introRef.current
    const bg = bgRef.current
    if (!intro || !bg) return

    intro.volume = 0.8
    bg.volume = 0.35
    try {
      await intro.play()
      intro.onended = () => {
        bg.loop = true
        bg.play().catch(() => {
          /* ignore */
        })
      }
    } catch {
      // Autoplay was blocked – wait for first user interaction
      const resume = async () => {
        try {
          await intro.play()
          intro.onended = () => bg.play().catch(() => {})
        } finally {
          window.removeEventListener("click", resume)
          window.removeEventListener("touchstart", resume)
          window.removeEventListener("keydown", resume)
        }
      }
      window.addEventListener("click", resume, { once: true })
      window.addEventListener("touchstart", resume, { once: true })
      window.addEventListener("keydown", resume, { once: true })
    }
  }

  useEffect(() => {
    // Wait until intro file is ready
    const intro = introRef.current
    if (!intro) return
    const onReady = () => playSequence()
    intro.addEventListener("canplaythrough", onReady, { once: true })
    return () => intro.removeEventListener("canplaythrough", onReady)
  }, [])

  return (
    <>
      <audio ref={introRef} preload="auto" playsInline crossOrigin="anonymous">
        <source src="/audio/intro-sound.mp3" type="audio/mpeg" />
      </audio>

      <audio ref={bgRef} preload="auto" playsInline crossOrigin="anonymous">
        <source src="https://files.catbox.moe/4i3vwy.mpeg" type="audio/mpeg" />
      </audio>
    </>
  )
}
