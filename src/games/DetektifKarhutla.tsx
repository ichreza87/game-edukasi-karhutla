import { useState } from "react"

const spots = [
  { id: 1, label: "Tumpukan daun kering", risk: true, emoji: "🍂", tip: "Daun kering mudah terbakar — bersihkan!" },
  { id: 2, label: "Sungai yang mengalir", risk: false, emoji: "💧", tip: "Sumber air justru membantu cegah karhutla." },
  { id: 3, label: "Ranting kering menumpuk", risk: true, emoji: "🪵", tip: "Ranting kering = bahan bakar api." },
  { id: 4, label: "Jalur sekat bakar", risk: false, emoji: "🚧", tip: "Sekat bakar memutus penyebaran api." },
  { id: 5, label: "Cuaca panas + angin kencang", risk: true, emoji: "🌞", tip: "Kombinasi berbahaya — tingkatkan patroli!" },
  { id: 6, label: "Hutan lembab rindang", risk: false, emoji: "🌲", tip: "Hutan sehat lebih tahan api." },
]

export default function DetektifKarhutla({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({})
  const [feedback, setFeedback] = useState("")

  const choose = (id: number, isRisk: boolean) => {
    const correct = spots.find((s) => s.id === id)!.risk === isRisk
    setAnswers((a) => ({ ...a, [id]: correct }))
    setFeedback(correct ? "✅ Tepat!" : `❌ ${spots.find((s) => s.id === id)!.tip}`)
    setTimeout(() => setFeedback(""), 1000)
  }

  const score = Object.values(answers).filter(Boolean).length
  const done = Object.keys(answers).length === spots.length

  return (
    <div className="card">
      <h3 className="font-bold text-xl text-center mb-1">🔍 Detektif Karhutla</h3>
      <p className="text-sm text-center text-gray-600 mb-4">Tandai mana yang meningkatkan risiko kebakaran!</p>
      <div className="grid md:grid-cols-2 gap-3">
        {spots.map((s) => (
          <div key={s.id} className={`p-3 rounded-2xl border-2 ${answers[s.id] === true ? "border-eco-400 bg-eco-50" : answers[s.id] === false ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"}`}>
            <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{s.emoji}</span><span className="font-semibold text-sm">{s.label}</span></div>
            <div className="flex gap-2">
              <button onClick={() => choose(s.id, true)} className="flex-1 py-1.5 rounded-xl text-sm font-bold bg-orange-100 hover:bg-orange-200">Berisiko 🔥</button>
              <button onClick={() => choose(s.id, false)} className="flex-1 py-1.5 rounded-xl text-sm font-bold bg-sky-100 hover:bg-sky-200">Aman ✅</button>
            </div>
          </div>
        ))}
      </div>
      {feedback && <p className="text-center font-bold mt-3">{feedback}</p>}
      {done && (
        <div className="text-center mt-4">
          <p className="font-bold">Skor: {score}/{spots.length}</p>
          <button onClick={() => onComplete(score)} className="btn-primary mt-2">Selesai</button>
          <p className="text-xs text-gray-500 mt-2">Ingat: jangan pernah mencoba membakar lahan. Selalu lapor petugas!</p>
        </div>
      )}
    </div>
  )
}
