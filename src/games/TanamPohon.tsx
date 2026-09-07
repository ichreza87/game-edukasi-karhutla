import { useState } from "react"

const steps = ["Pilih Lokasi 📍", "Gali Tanah 🕳️", "Tanam Bibit 🌱", "Siram Air 💧", "Rawat 🌳"]

export default function TanamPohon({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [trees, setTrees] = useState(0)

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1)
    else {
      setTrees((t) => t + 1)
      setStep(0)
      if (trees + 1 >= 3) onComplete()
    }
  }

  return (
    <div className="card text-center">
      <h3 className="font-bold text-xl mb-4">🌳 Pahlawan Penghijauan — {trees}/3 pohon</h3>
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={s} className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xs font-bold border-2 ${i < step ? "bg-eco-500 text-white border-eco-500" : i === step ? "bg-amber-100 border-amber-400 animate-pulse" : "bg-gray-100 border-gray-200"}`}>
            {s.split(" ")[0]}
          </div>
        ))}
      </div>
      <p className="mb-2 font-semibold">{steps[step]}</p>
      <p className="text-sm text-gray-600 mb-4">Tahapan: Benih → Kecambah → Anakan → Pohon → Hutan</p>
      <button onClick={next} className="btn-primary w-full">
        {step === steps.length - 1 ? "Selesai & Tanam Lagi" : "Lanjut →"}
      </button>
      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: trees }).map((_, i) => (
          <span key={i} className="text-3xl">🌳</span>
        ))}
        {Array.from({ length: 3 - trees }).map((_, i) => (
          <span key={i} className="text-3xl opacity-20">🌳</span>
        ))}
      </div>
    </div>
  )
}
