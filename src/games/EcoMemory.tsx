import { useState } from "react"

const EMOJIS = ["🌳", "🐟", "♻️", "💧", "🌞", "🦁", "📄", "🧴"]

export default function EcoMemory({ onComplete }: { onComplete: (moves: number) => void }) {
  const [cards] = useState(() => {
    const pairs = [...EMOJIS.slice(0, 6), ...EMOJIS.slice(0, 6)].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, emoji: e }))
    return pairs
  })
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  const flip = (id: number) => {
    if (flipped.includes(id) || matched.includes(id) || flipped.length >= 2) return
    const nf = [...flipped, id]
    setFlipped(nf)
    if (nf.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nf
      if (cards[a].emoji === cards[b].emoji) {
        setMatched((prev) => [...prev, a, b])
        setFlipped([])
        if (matched.length + 2 >= cards.length) setTimeout(() => onComplete(moves + 1), 500)
      } else {
        setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  return (
    <div className="card">
      <h3 className="font-bold text-center mb-2">🧠 Eco Memory — Gerakan: {moves}</h3>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((c, idx) => {
          const visible = flipped.includes(idx) || matched.includes(idx)
          return (
            <button key={c.id} onClick={() => flip(idx)} className={`aspect-square rounded-2xl text-3xl font-bold border-2 flex items-center justify-center ${visible ? "bg-eco-50 border-eco-300" : "bg-eco-600 border-eco-700 text-white hover:bg-eco-700"}`} aria-label="kartu memory">
              {visible ? c.emoji : "?"}
            </button>
          )
        })}
      </div>
    </div>
  )
}
