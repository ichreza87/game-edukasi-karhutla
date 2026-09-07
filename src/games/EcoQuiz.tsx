import { useState } from "react"
import type { QuizQuestion } from "../models/types"
import { useGameStore } from "../stores/gameStore"

export default function EcoQuiz({ questions, onFinish }: { questions: QuizQuestion[]; onFinish: (score: number) => void }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [show, setShow] = useState(false)
  const [score, setScore] = useState(0)
  const { updateCombo } = useGameStore()
  const q = questions[idx]

  const answer = (i: number) => {
    setSelected(i)
    setShow(true)
    const correct = i === q.correctAnswer
    updateCombo(correct)
    if (correct) setScore((s) => s + 1)
  }

  const isCorrect = selected === q.correctAnswer
  const finalNext = () => {
    if (idx + 1 >= questions.length) onFinish(score)
    else {
      setIdx((v) => v + 1)
      setSelected(null)
      setShow(false)
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between text-sm font-bold mb-2"><span>Quiz {idx + 1}/{questions.length}</span><span>⭐ {score}</span></div>
      <p className="font-bold text-lg mb-4">{q.question}</p>
      <div className="grid gap-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !show && answer(i)}
            className={`text-left p-3 rounded-2xl border-2 font-semibold transition ${show ? (i === q.correctAnswer ? "bg-eco-100 border-eco-400" : i === selected ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200") : "bg-white border-gray-200 hover:border-eco-300"}`}
            disabled={show}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      {show && (
        <div className={`mt-4 p-3 rounded-xl ${isCorrect ? "bg-eco-50 border border-eco-200" : "bg-amber-50 border border-amber-200"}`}>
          <p className="font-bold">{isCorrect ? "✅ Hebat!" : "💡 Belum tepat."}</p>
          <p className="text-sm mt-1">{q.explanation}</p>
          <button onClick={finalNext} className="btn-primary mt-3 w-full">{idx + 1 >= questions.length ? "Lihat Hasil" : "Lanjut →"}</button>
        </div>
      )}
    </div>
  )
}
