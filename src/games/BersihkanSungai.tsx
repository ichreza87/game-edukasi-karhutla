import { useState, useEffect } from "react"

type Item = { id: number; type: "sampah" | "ikan"; emoji: string; x: number }

export default function BersihkanSungai({ onComplete }: { onComplete: (score: number) => void }) {
  const [items, setItems] = useState<Item[]>([])
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20)

  useEffect(() => {
    const gen = setInterval(() => {
      if (time <= 0) return
      const isSampah = Math.random() > 0.3
      setItems((prev) => [...prev.slice(-8), { id: Date.now() + Math.random(), type: isSampah ? "sampah" : "ikan", emoji: isSampah ? (["🧴", "🛍️", "🥫", "📄"][Math.floor(Math.random() * 4)]) : "🐟", x: Math.random() * 80 + 10 }])
    }, 700)
    return () => clearInterval(gen)
  }, [time])

  useEffect(() => {
    if (time <= 0) return
    const t = setTimeout(() => setTime((v) => v - 1), 1000)
    return () => clearTimeout(t)
  }, [time])

  useEffect(() => {
    if (time === 0) onComplete(score)
  }, [time, score, onComplete])

  const tap = (it: Item) => {
    setItems((prev) => prev.filter((p) => p.id !== it.id))
    if (it.type === "sampah") setScore((s) => s + 10)
    else setScore((s) => Math.max(0, s - 5))
  }

  return (
    <div className="card">
      <div className="flex justify-between font-bold mb-2"><span>🐟 Jangan ambil ikan!</span><span>⏱️ {time}s | ⭐ {score}</span></div>
      <div className="relative h-64 bg-gradient-to-b from-sky-200 to-sky-400 rounded-2xl overflow-hidden border-2 border-sky-300">
        <p className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-xs font-bold">Tap sampah, hindari ikan!</p>
        {items.map((it) => (
          <button key={it.id} onClick={() => tap(it)} className="absolute text-3xl animate-bounce" style={{ left: `${it.x}%`, top: `${30 + Math.random() * 50}%` }} aria-label={it.type}>
            {it.emoji}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">Sampah mencemari sungai dan membahayakan ikan.</p>
    </div>
  )
}
