import { useGameStore } from "../stores/gameStore"
import { xpForNextLevel } from "../models/types"

export default function Header({ onNav }: { onNav: (v: string) => void }) {
  const { name, avatar, level, xp, ecoPoints, coins, streak } = useGameStore()
  const { current, needed, progress } = xpForNextLevel(xp)
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-eco-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
        <button onClick={() => onNav("menu")} className="flex items-center gap-2 font-black text-eco-700 text-xl" aria-label="Ke beranda">
          <span className="text-3xl">🌍</span> EcoGuard
          <span className="hidden sm:inline text-eco-500 font-bold text-sm">EduGame</span>
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden md:flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">🔥 {streak} hari</span>
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">🪙 {coins}</span>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">🍃 {ecoPoints}</span>
          <div className="hidden sm:flex items-center gap-2 bg-eco-50 px-3 py-1 rounded-full border border-eco-200">
            <span className="text-xl">{avatar}</span>
            <span className="font-bold text-eco-800">{name}</span>
            <span className="bg-eco-600 text-white px-2 py-0.5 rounded-full text-xs">Lv {level}</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between text-xs font-semibold text-eco-700 mb-1">
            <span>Level {level}</span><span>{current}/{needed} XP</span>
          </div>
          <div className="progress-track h-2">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} />
          </div>
        </div>
      </div>
    </header>
  )
}
