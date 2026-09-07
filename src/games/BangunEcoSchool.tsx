import { useState } from "react"

const facilities = [
  { id: "bank", name: "Bank Sampah", emoji: "♻️", desc: "Pilah sampah bernilai" },
  { id: "taman", name: "Taman Sekolah", emoji: "🌷", desc: "Hijaukan halaman" },
  { id: "kompos", name: "Komposter", emoji: "🍂", desc: "Olah organik jadi kompos" },
  { id: "air", name: "Tempat Air Minum", emoji: "🚰", desc: "Kurangi botol plastik" },
  { id: "kebun", name: "Kebun Sekolah", emoji: "🥬", desc: "Tanam sayur bersama" },
  { id: "hemat", name: "Hemat Energi", emoji: "💡", desc: "Matikan lampu tak perlu" },
]

export default function BangunEcoSchool({ onComplete }: { onComplete: (selected: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <div className="card">
      <h3 className="font-bold text-xl text-center mb-1">🏫 Bangun Eco School</h3>
      <p className="text-sm text-center text-gray-600 mb-4">Pilih minimal 3 fasilitas untuk sekolah Adiwiyata!</p>
      <div className="grid md:grid-cols-3 gap-3">
        {facilities.map((f) => (
          <button key={f.id} onClick={() => toggle(f.id)} className={`p-4 rounded-2xl border-2 text-left transition ${selected.includes(f.id) ? "bg-eco-100 border-eco-400" : "bg-white border-gray-200 hover:border-eco-200"}`}>
            <div className="text-3xl">{f.emoji}</div>
            <div className="font-bold text-sm mt-1">{f.name}</div>
            <div className="text-xs text-gray-600">{f.desc}</div>
          </button>
        ))}
      </div>
      <button disabled={selected.length < 3} onClick={() => onComplete(selected)} className="btn-primary w-full mt-4 disabled:opacity-40">
        Bangun Sekolah ({selected.length}/3)
      </button>
    </div>
  )
}
