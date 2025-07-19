"use client"

import { useEffect, useRef } from "react"

export default function AudioManager() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.3
      audio.play().catch(console.error)
    }
  }, [])

  return (
    <audio ref={audioRef} loop autoPlay preload="auto">
      <source src="https://files.catbox.moe/4i3vwy.mpeg" type="audio/mpeg" />
    </audio>
  )
}
