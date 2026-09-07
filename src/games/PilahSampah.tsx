import { useState } from "react"
import { wasteItems } from "../data/levels"
import { useGameStore } from "../stores/gameStore"

const BINS: Record<string, string> = {
  organik: "🟤 Organik",
  plastik: "🔵 Plastik",
  kertas: "⚪ Kertas",
  logam: "🔘 Logam",
  kaca: "🟢 Kaca",
  b3: "🔴 B3",
  residu: "⚫ Residu",
}

export default function PilahSampah({ onComplete }: { onComplete: (score: number) => void }) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const { updateCombo } = useGameStore()
  const items = wasteItems.slice(0, 8)
  const current = items[idx]

  const choose = (cat: string) => {
    const correct = current.category === cat
    updateCombo(correct)
    if (correct) {
      setScore((s) => s + 1)
      setFeedback(`✅ Benar! ${current.name} → ${BINS[cat]}`)
    } else {
      setFeedback(`❌ Belum tepat. ${current.name} seharusnya → ${BINS[current.category]}. ${current.tip}`)
    }
    setTimeout(() => {
      setFeedback("")
      if (idx + 1 >= items.length) onComplete(score + (correct ? 1 : 0))
      else setIdx((i) => i + 1)
    }, 1200)
  }

  if (!current) return null
  return (
    <div className="card text-center">
      <h3 className="text-xl font-bold mb-2">♻️ Pilah Sampah — {idx + 1}/{items.length}</h3>
      <p className="text-sm text-gray-600 mb-4">Seret sampah ke tempat yang benar!</p>
      <div className="text-6xl mb-2">{current.emoji}</div>
      <p className="font-bold text-lg mb-4">{current.name}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(BINS).map(([k, v]) => (
          <button key={k} onClick={() => choose(k)} className="btn-secondary text-sm py-2">{v}</button>
        ))}
      </div>
      {feedback && <p className="mt-4 font-semibold p-3 bg-eco-50 rounded-xl" role="status">{feedback}</p>}
      <p className="mt-3 text-sm">Skor: {score}</p>
    </div>
  )
}
