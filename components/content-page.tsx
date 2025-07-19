"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"

export default function ContentPage() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const backgroundAudioRef = useRef<HTMLAudioElement>(null)

  const videos = [
    { id: 1, title: "PlankXploit Demo 1", src: "https://files.catbox.moe/73h8it.mp4" },
    { id: 2, title: "PlankXploit Demo 2", src: "https://files.catbox.moe/pzsila.mp4" },
    { id: 3, title: "PlankXploit Demo 3", src: "https://files.catbox.moe/u63jlv.mp4" },
    { id: 4, title: "PlankXploit Demo 4", src: "https://files.catbox.moe/kwqkt2.mp4" },
    { id: 5, title: "PlankXploit Demo 5", src: "https://files.catbox.moe/u4q8mf.mp4" },
  ]

  const handleVideoPlay = (videoSrc: string) => {
    setCurrentVideo(videoSrc)
    setIsPlaying(true)

    // Pause background audio when video plays
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause()
    }
  }

  const handleVideoClose = () => {
    setCurrentVideo(null)
    setIsPlaying(false)

    // Resume background audio when video closes
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.play()
    }
  }

  const handleVideoPause = () => {
    setIsPlaying(false)

    // Resume background audio when video is paused
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.play()
    }
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-6xl mx-auto bg-black/90 border-green-400 text-green-400">
        <CardHeader>
          <CardTitle className="text-center text-3xl">🎥 PLANKXPLOIT CONTENT</CardTitle>
          <p className="text-center text-green-300">Exclusive content and demonstrations</p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="bg-black/50 border-green-400">
                <CardContent className="p-4">
                  <video className="w-full h-48 object-cover rounded-lg mb-4" poster="/images/profile.jpg">
                    <source src={video.src} type="video/mp4" />
                  </video>

                  <h3 className="text-green-400 font-bold mb-2">{video.title}</h3>

                  <Button onClick={() => handleVideoPlay(video.src)} className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Play Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Modal */}
      {currentVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <Button onClick={handleVideoClose} className="absolute -top-12 right-0 bg-red-600 hover:bg-red-700">
              <X className="w-5 h-5" />
            </Button>

            <video
              ref={videoRef}
              className="w-full rounded-lg"
              controls
              autoPlay
              onPlay={() => setIsPlaying(true)}
              onPause={handleVideoPause}
              onEnded={handleVideoClose}
            >
              <source src={currentVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Background Audio Reference */}
      <audio ref={backgroundAudioRef} style={{ display: "none" }}>
        <source src="https://files.catbox.moe/4i3vwy.mpeg" type="audio/mpeg" />
      </audio>
    </div>
  )
}
