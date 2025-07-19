"use client"

interface TouchAnimationProps {
  x: number
  y: number
}

export default function TouchAnimation({ x, y }: TouchAnimationProps) {
  return (
    <div className="fixed pointer-events-none z-50" style={{ left: x, top: y }}>
      <div className="relative">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-bold text-xl animate-ping"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-30px)`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          >
            PLANK DEV
          </div>
        ))}
      </div>
    </div>
  )
}
