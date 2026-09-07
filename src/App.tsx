import { useEffect, useState } from "react"
import Header from "./components/Header"
import { useGameStore } from "./stores/gameStore"
import { missions } from "./data/missions"
import { badges } from "./data/badges"
import { quizzes } from "./data/quizzes"
import { levels, ecoFacts, ecoTips } from "./data/levels"
import { lazy, Suspense } from "react"
const PilahSampah = lazy(() => import("./games/PilahSampah"))
const TanamPohon = lazy(() => import("./games/TanamPohon"))
const DetektifKarhutla = lazy(() => import("./games/DetektifKarhutla"))
const BersihkanSungai = lazy(() => import("./games/BersihkanSungai"))
const EcoQuiz = lazy(() => import("./games/EcoQuiz"))
const EcoMemory = lazy(() => import("./games/EcoMemory"))
const BangunEcoSchool = lazy(() => import("./games/BangunEcoSchool"))
import { calcEcoBalance } from "./utils/gameLogic"
import { ecoEvents, getActiveEvent } from "./data/events"
import { getLang, setLang, t } from "./services/i18n"
import { toCSV, downloadCSV } from "./utils/export"
import { audio } from "./services/audio"

type View = "menu" | "world" | "missions" | "play" | "badges" | "inventory" | "leaderboard" | "learn" | "settings" | "teacher"

export default function App() {
  const [view, setView] = useState<View>("menu")
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null)
  const [phase, setPhase] = useState<"briefing" | "game" | "result">("briefing")
  const [lastScore, setLastScore] = useState(0)
  const [quizLevel, setQuizLevel] = useState<number | null>(null)
  const [showMissionComplete, setShowMissionComplete] = useState(false)
  const [toast, setToast] = useState("")
  const [lang, setLangState] = useState(getLang())
  const [highContrast, setHighContrast] = useState(false)
  const activeEvent = getActiveEvent()
  const store = useGameStore()

  useEffect(() => { store.checkStreak() }, [])

  const activeMission = missions.find((m) => m.id === activeMissionId) ?? null

  const startMission = (id: string) => {
    setActiveMissionId(id)
    setPhase("briefing")
    setView("play")
  }

  const handleGameComplete = (score: number) => {
    setLastScore(score)
    setPhase("result")
    if (activeMission && !store.completedMissions.includes(activeMission.id)) {
      store.completeMission(activeMission.id, activeMission.xpReward, activeMission.ecoPointReward, activeMission.coinReward, activeMission.badgeId)
      setShowMissionComplete(true)
      setTimeout(() => setShowMissionComplete(false), 4000)
    }
  }

  const ecoWorld = {
    forestHealth: Math.min(100, 30 + store.completedMissions.length * 12),
    airQuality: Math.min(100, 40 + store.badges.length * 10),
    waterQuality: Math.min(100, 35 + (store.completedMissions.includes("river-001") ? 40 : 0) + store.level * 5),
    wasteManagement: Math.min(100, 25 + store.ecoPoints / 10),
    biodiversity: Math.min(100, 30 + (store.completedMissions.includes("wildlife-001") ? 35 : 0)),
    greenArea: Math.min(100, 20 + store.completedMissions.length * 10),
    communityAwareness: Math.min(100, 30 + store.totalMissions * 8),
  }
  const ecoBalance = calcEcoBalance(ecoWorld)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2000) }
  const toggleLang = () => { const next = lang === "id" ? "en" : "id"; setLang(next as never); setLangState(next as never); showToast(next === "id" ? "Bahasa: Indonesia" : "Language: English") }
  const [muted, setMuted] = useState(audio.isMuted())
  const handleExportCSV = () => {
    const rows = [
      { name: store.name, level: store.level, xp: store.xp, eco: store.ecoPoints, missions: store.completedMissions.length, quiz: store.quizScore, badges: store.badges },
      { name: "Siti", level: 4, xp: 890, eco: 420, missions: 6, quiz: 85, badges: ["recycle-master"] },
      { name: "Budi", level: 3, xp: 750, eco: 380, missions: 5, quiz: 78, badges: ["green-starter"] },
    ]
    downloadCSV(toCSV(rows))
    showToast("CSV terunduh ✓")
  }

  return (
    <div className={`min-h-screen ${highContrast ? "bg-white text-black contrast-more" : "bg-gradient-to-b from-eco-50 to-white"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-eco-700 text-white px-4 py-2 rounded-xl z-50">Skip to content</a>
      {activeEvent && (
        <div className="bg-amber-400 text-amber-900 text-center text-sm font-bold py-2 px-4">
          {activeEvent.emoji} EVENT: {activeEvent.title} — {activeEvent.description} 🎯 {activeEvent.goal} ({activeEvent.start}→{activeEvent.end})
        </div>
      )}
      <Header onNav={(v) => setView(v as View)} />
      {toast && <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-eco-700 text-white px-6 py-2 rounded-full font-bold shadow-lg z-50" role="status">{toast}</div>}
      {showMissionComplete && activeMission && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 text-center max-w-md w-full animate-bounce">
            <div className="text-6xl mb-2">🎉</div>
            <h2 className="text-2xl font-black text-eco-700">MISSION COMPLETE!</h2>
            <p className="font-bold mt-2">{activeMission.title}</p>
            <p className="text-sm bg-eco-50 p-3 rounded-xl mt-3"><b>Apa yang kamu pelajari?</b><br />{activeMission.educationalMaterial}</p>
            <p className="text-sm bg-amber-50 p-2 rounded-xl mt-2">💡 Eco Tip: {activeMission.ecoTip}</p>
            <p className="text-xs text-gray-500 mt-2">Fun Fact: {activeMission.funFact}</p>
            <div className="flex gap-2 justify-center mt-4 font-bold">
              <span className="bg-eco-100 px-3 py-1 rounded-full">+{activeMission.xpReward} XP</span>
              <span className="bg-emerald-100 px-3 py-1 rounded-full">+{activeMission.ecoPointReward} 🍃</span>
              <span className="bg-amber-100 px-3 py-1 rounded-full">+{activeMission.coinReward} 🪙</span>
            </div>
            <button onClick={() => setShowMissionComplete(false)} className="btn-primary w-full mt-4">Lanjut</button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-1 flex justify-end gap-2">
        <button onClick={toggleLang} className="text-xs font-bold border border-eco-200 px-3 py-1 rounded-full bg-white" aria-label="Ganti bahasa">{lang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"} • {t("teacher")}</button>
        <button onClick={() => setHighContrast((v) => !v)} className="text-xs font-bold border border-eco-200 px-3 py-1 rounded-full bg-white" aria-pressed={highContrast}>♿ {highContrast ? "Normal" : "High Contrast"}</button>
      </div>
      <main id="main" className="max-w-6xl mx-auto px-4 py-6">
        {view === "menu" && (
          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-eco-500 to-eco-700 text-white border-none text-center py-10">
              <div className="text-6xl mb-3">🌍 EcoGuard EduGame</div>
              <h1 className="text-3xl md:text-5xl font-black">Mainkan Misinya.<br />Selamatkan Lingkungannya.</h1>
              <p className="mt-3 text-white/90 max-w-xl mx-auto">Game edukasi lingkungan untuk SD & SMP — karhutla, penghijauan, daur ulang, konservasi air, dan aksi nyata.</p>
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <button onClick={() => setView("world")} className="bg-white text-eco-700 font-black px-8 py-3 rounded-2xl shadow">▶️ MAIN SEKARANG</button>
                <button onClick={() => setView("missions")} className="bg-eco-800 text-white font-bold px-8 py-3 rounded-2xl">📋 LIHAT MISI</button>
                <button onClick={() => setView("teacher")} className="bg-white/20 text-white font-bold px-6 py-3 rounded-2xl border border-white/30">👩‍🏫 MODE GURU</button>
              </div>
              <p className="text-xs mt-4 text-white/70">Try Demo — tanpa login, langsung main!</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="text-3xl">🎮</div><h3 className="font-bold">10 Level Edukatif</h3><p className="text-sm text-gray-600">Dari Kenali Lingkungan hingga Eco Guardian</p>
                <button onClick={() => setView("missions")} className="btn-secondary mt-3 w-full">Jelajahi</button>
              </div>
              <div className="card text-center">
                <div className="text-3xl">🌳</div><h3 className="font-bold">Eco World Dinamis</h3><p className="text-sm text-gray-600">Dunia berubah saat kamu beraksi</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs font-bold"><span>ECO BALANCE</span><span>{ecoBalance}%</span></div>
                  <div className="progress-track h-3 mt-1"><div className="progress-fill" style={{ width: `${ecoBalance}%` }} /></div>
                </div>
              </div>
              <div className="card text-center">
                <div className="text-3xl">🏆</div><h3 className="font-bold">Badge & Leaderboard</h3><p className="text-sm text-gray-600">{store.badges.length}/{badges.length} badge terkumpul</p>
                <button onClick={() => setView("badges")} className="btn-secondary mt-3 w-full">Lihat Badge</button>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold mb-3">🗺️ Peta Cepat — Pilih Wilayah</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {levels.slice(0, 10).map((lv) => (
                  <button key={lv.id} onClick={() => startMission(missions.find((m) => m.level === lv.id)?.id ?? missions[0].id)} className="p-3 rounded-2xl border-2 border-eco-100 hover:border-eco-300 bg-white text-center">
                    <div className="text-2xl">{lv.icon}</div><div className="font-bold text-xs mt-1">{lv.title}</div><div className="text-[11px] text-gray-500">{lv.region}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "world" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">🗺️ Eco World</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {levels.map((lv) => {
                const m = missions.find((x) => x.level === lv.id)
                const done = m ? store.completedMissions.includes(m.id) : false
                return (
                  <div key={lv.id} className={`card flex gap-4 items-center ${done ? "border-eco-300 bg-eco-50" : ""}`}>
                    <div className="text-4xl">{lv.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold">Level {lv.id}: {lv.title}</div>
                      <div className="text-xs text-gray-600">{lv.subtitle} • {lv.region}</div>
                      {m && <div className="text-xs mt-1">{done ? "✅ Selesai" : `🎯 ${m.xpReward} XP • ${m.ecoPointReward} 🍃`}</div>}
                    </div>
                    <button onClick={() => m && startMission(m.id)} className={done ? "btn-secondary text-sm" : "btn-primary text-sm"}>{done ? "Ulang" : "Main"}</button>
                  </div>
                )
              })}
            </div>
            <div className="card">
              <h3 className="font-bold mb-3">🌍 Indikator Eco Balance: {ecoBalance}%</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {Object.entries(ecoWorld).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-xs font-semibold"><span className="capitalize">{k.replace(/([A-Z])/g, " $1")}</span><span>{v}%</span></div>
                    <div className="progress-track h-2 mt-1"><div className="progress-fill" style={{ width: `${v}%` }} /></div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Selesaikan misi untuk menghijaukan dunia — pohon bertambah, sungai bersih, satwa muncul.</p>
            </div>
          </div>
        )}

        {view === "missions" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">📋 Misi EcoGuard</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="badge-pill bg-eco-100 text-eco-700">Total: {missions.length} misi</span>
              <span className="badge-pill bg-emerald-100 text-emerald-700">Selesai: {store.completedMissions.length}</span>
              <span className="badge-pill bg-amber-100 text-amber-700">XP: {store.xp}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {missions.map((m) => {
                const done = store.completedMissions.includes(m.id)
                return (
                  <div key={m.id} className={`card ${done ? "bg-eco-50 border-eco-200" : ""}`}>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold">{m.title}</h3>
                      <span className={`badge-pill ${m.difficulty === "easy" ? "bg-green-100 text-green-700" : m.difficulty === "normal" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{m.difficulty}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{m.description}</p>
                    <div className="flex gap-2 mt-2 text-xs font-bold"><span>⭐ {m.xpReward} XP</span><span>🍃 {m.ecoPointReward}</span><span>🪙 {m.coinReward}</span><span className="ml-auto">Level {m.level}</span></div>
                    <ul className="text-xs mt-2 list-disc list-inside text-gray-600">{m.objectives.slice(0, 2).map((o) => <li key={o}>{o}</li>)}</ul>
                    <button onClick={() => startMission(m.id)} className={`w-full mt-3 ${done ? "btn-secondary" : "btn-primary"}`}>{done ? "Main Lagi ✓" : "Mulai Misi →"}</button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {view === "play" && activeMission && (
          <div className="space-y-4">
            <button onClick={() => setView("missions")} className="text-sm font-bold text-eco-700">← Kembali ke Misi</button>
            {phase === "briefing" && (
              <div className="card">
                <h2 className="text-2xl font-black">{activeMission.title}</h2>
                <p className="text-gray-600 mt-1">{activeMission.description}</p>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mt-4">
                  <p className="font-bold text-sm">🎯 Tujuan:</p>
                  <ul className="text-sm list-disc list-inside">{activeMission.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 mt-3">
                  <p className="font-bold text-sm">📚 Bekal Edukasi:</p>
                  <p className="text-sm">{activeMission.educationalMaterial}</p>
                </div>
                <div className="flex gap-2 mt-4 font-bold text-sm">
                  <span className="bg-eco-100 px-3 py-1 rounded-full">⭐ {activeMission.xpReward} XP</span>
                  <span className="bg-emerald-100 px-3 py-1 rounded-full">🍃 {activeMission.ecoPointReward}</span>
                </div>
                <button onClick={() => setPhase("game")} className="btn-primary w-full mt-4 text-lg">Mulai Game →</button>
                {activeMission.category === "karhutla" && <p className="text-xs text-center text-gray-500 mt-2">Fokus: pencegahan & keselamatan. Jangan pernah mencoba membakar lahan.</p>}
              </div>
            )}
            {phase === "game" && (
              <Suspense fallback={<div className="card text-center py-8">⏳ Memuat game...</div>}>
                <div>
                  {activeMission.level === 6 || activeMission.id === "recycle-001" ? <PilahSampah onComplete={handleGameComplete} /> :
                    activeMission.level === 4 ? <TanamPohon onComplete={() => handleGameComplete(3)} /> :
                      activeMission.level === 3 ? <DetektifKarhutla onComplete={handleGameComplete} /> :
                        activeMission.level === 5 ? <BersihkanSungai onComplete={handleGameComplete} /> :
                          activeMission.level === 9 ? <BangunEcoSchool onComplete={() => handleGameComplete(3)} /> :
                            activeMission.level === 2 ? <EcoMemory onComplete={handleGameComplete} /> :
                              <EcoQuiz questions={quizzes.filter((q) => q.level === activeMission.level).slice(0, 5)} onFinish={handleGameComplete} />}
                  <button onClick={() => setPhase("result")} className="btn-secondary w-full mt-3">Lewati Game (Demo)</button>
                </div>
              </Suspense>
            )}
            {phase === "result" && (
              <div className="card text-center">
                <div className="text-5xl">🌟</div>
                <h3 className="text-xl font-black mt-2">Misi Selesai!</h3>
                <p className="text-sm text-gray-600">Skor: {lastScore} • XP +{activeMission.xpReward} • Eco +{activeMission.ecoPointReward}</p>
                <div className="bg-eco-50 p-3 rounded-xl mt-3 text-left">
                  <p className="font-bold text-sm">📖 Apa yang kamu pelajari?</p><p className="text-sm">{activeMission.educationalMaterial}</p>
                  <p className="font-bold text-sm mt-2">💡 Eco Tip:</p><p className="text-sm">{activeMission.ecoTip}</p>
                  <p className="text-xs text-gray-500 mt-2">Fun Fact: {activeMission.funFact}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button onClick={() => { setPhase("briefing"); setView("missions") }} className="btn-secondary">Kembali ke Misi</button>
                  <button onClick={() => setView("world")} className="btn-primary">Ke Eco World →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {view === "badges" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">🏆 Badge Collection</h2>
            <p className="text-sm text-gray-600">{store.badges.length}/{badges.length} terkumpul • Combo terbaik: x{store.maxCombo}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {badges.map((b) => {
                const unlocked = store.badges.includes(b.id)
                return (
                  <div key={b.id} className={`card text-center ${unlocked ? "bg-eco-50 border-eco-300" : "opacity-60"}`}>
                    <div className="text-4xl">{b.icon}</div>
                    <div className="font-bold text-sm mt-1">{b.name}</div>
                    <div className="text-xs text-gray-600">{b.description}</div>
                    <div className={`badge-pill mt-2 ${unlocked ? "bg-eco-600 text-white" : "bg-gray-200 text-gray-600"}`}>{unlocked ? "Terbuka ✓" : "Terkunci"}</div>
                  </div>
                )
              })}
            </div>
            <div className="card">
              <h3 className="font-bold">🔥 Combo & Streak</h3>
              <p className="text-sm">Combo sekarang: <b>x{store.combo}</b> • Max: x{store.maxCombo} • Streak: {store.streak} hari</p>
              <p className="text-xs text-gray-500">3 benar berturut = +10 XP • 5 = +25 XP • 10 = +50 XP + badge!</p>
            </div>
          </div>
        )}

        {view === "inventory" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">🎒 Inventory</h2>
            <div className="card">
              <p className="font-bold">Avatar: <span className="text-2xl">{store.avatar}</span> {store.name}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {["🌱", "🌳", "🦁", "🧑‍🌾", "👩‍🔬", "🦸"].map((a) => (
                  <button key={a} onClick={() => store.setAvatar(a)} className={`text-3xl p-2 rounded-xl border-2 ${store.avatar === a ? "border-eco-500 bg-eco-100" : "border-gray-200"}`}>{a}</button>
                ))}
              </div>
              <input value={store.name} onChange={(e) => store.setName(e.target.value)} placeholder="Nama karakter" className="mt-3 w-full border-2 border-eco-200 rounded-xl px-3 py-2" aria-label="Nama karakter" />
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">Item ({store.inventory.length})</h3>
              <div className="flex flex-wrap gap-2">
                {store.inventory.map((it) => <span key={it} className="bg-eco-100 px-3 py-1 rounded-full text-sm font-semibold">{it}</span>)}
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => store.addInventory("bibit-" + Date.now())} className="btn-secondary text-sm">+ Tambah Bibit</button>
                <button onClick={() => showToast("Toko kosmetik segera hadir — tanpa pay-to-win!")} className="btn-secondary text-sm">🛒 Toko</button>
              </div>
            </div>
          </div>
        )}

        {view === "leaderboard" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">🏆 Leaderboard</h2>
            <div className="card">
              <div className="flex gap-2 mb-3"><span className="badge-pill bg-eco-600 text-white">Mingguan</span><span className="badge-pill bg-gray-100">Bulanan</span><span className="badge-pill bg-gray-100">Kelas</span></div>
              {[
                { rank: 1, name: store.name, xp: store.xp, eco: store.ecoPoints, badge: "🌟 Kamu" },
                { rank: 2, name: "Siti", xp: 890, eco: 420, badge: "♻️ Recycling Hero" },
                { rank: 3, name: "Budi", xp: 750, eco: 380, badge: "🌳 Tree Planter" },
                { rank: 4, name: "Rina", xp: 620, eco: 310, badge: "🧠 Quiz Master" },
              ].sort((a, b) => b.xp - a.xp).map((r) => (
                <div key={r.rank} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <span className="font-black w-6">#{r.rank}</span>
                  <span className="flex-1 font-semibold">{r.name} <span className="text-xs text-gray-500">{r.badge}</span></span>
                  <span className="font-bold text-eco-700">{r.xp} XP</span>
                  <span className="text-sm">🍃 {r.eco}</span>
                </div>
              ))}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                {["Most Improved", "Recycling Hero", "Tree Planter", "Eco Helper"].map((c) => (
                  <div key={c} className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-center text-xs font-bold">{c}</div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Leaderboard mendorong partisipasi, bukan mempermalukan — ada kategori apresiasi untuk semua.</p>
            </div>
          </div>
        )}

        {view === "learn" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">📚 Learn & Quiz</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {ecoFacts.map((f, i) => (
                <div key={i} className="card bg-gradient-to-br from-sky-50 to-eco-50">
                  <div className="font-bold text-sm">💡 Fun Fact #{i + 1}</div><p className="text-sm mt-1">{f}</p>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-bold">💧 Eco Tips</h3>
              <ul className="text-sm list-disc list-inside mt-2">{ecoTips.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">🧠 Eco Quiz — Pilih Level</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {levels.map((lv) => (
                  <button key={lv.id} onClick={() => setQuizLevel(lv.id)} className={`p-2 rounded-xl border-2 font-bold ${quizLevel === lv.id ? "bg-eco-600 text-white border-eco-700" : "bg-white border-gray-200"}`}>{lv.id}</button>
                ))}
              </div>
              {quizLevel && (
                <Suspense fallback={<div className="text-center py-4">⏳ Memuat quiz...</div>}>
                  <div className="mt-4">
                    <EcoQuiz questions={quizzes.filter((q) => q.level === quizLevel).slice(0, 5)} onFinish={(s) => { showToast(`Quiz selesai! Skor ${s}/5`); setQuizLevel(null) }} />
                  </div>
                </Suspense>
              )}
            </div>
          </div>
        )}

        {view === "settings" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">⚙️ Pengaturan</h2>
            <div className="card">
              <h3 className="font-bold">🔊 Audio</h3>
              <p className="text-sm text-gray-600">SFX WebAudio (CC0 placeholder) — <code>src/services/audio.ts</code></p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button onClick={() => { const v = !muted; audio.setMuted(v); setMuted(v); audio.click(); showToast(v ? "🔇 Muted" : "🔊 Sound on") }} className="btn-secondary text-sm">{muted ? "🔇 Muted" : "🔊 Sound On"}</button>
                <button onClick={() => { audio.setVolume(0.8); audio.success(); showToast("Volume 80%") }} className="btn-secondary text-sm">🔊 80%</button>
                <button onClick={() => { audio.success(); showToast("Test success sound") }} className="btn-secondary text-sm">🎵 Test</button>
                <button onClick={() => { audio.levelUp(); showToast("Level up!") }} className="btn-secondary text-sm">⭐ LevelUp</button>
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold">♿ Aksesibilitas</h3>
              <ul className="text-sm list-disc list-inside text-gray-600"><li>Keyboard navigation + Skip link</li><li>High contrast toggle (atas halaman)</li><li>Bahasa {lang === "id" ? "Indonesia / English toggle" : "English / Indonesian toggle"}</li><li>Reduced motion (prefers-reduced-motion)</li><li>Tombol besar & label ARIA</li><li>Event banner configurable via <code>src/data/events.ts</code></li></ul>
              <p className="text-xs mt-2">Events aktif: {ecoEvents.length} (Bumi, Lingkungan, Air) — edit JSON untuk tambah event.</p>
            </div>
            <div className="card">
              <h3 className="font-bold">💾 Save System</h3>
              <p className="text-sm">Progress auto-save ke localStorage. Offline-ready (PWA).</p>
              <button onClick={() => { if (confirm("Reset progress?")) store.reset() }} className="bg-red-500 text-white font-bold px-4 py-2 rounded-xl mt-2">Reset Progress</button>
            </div>
          </div>
        )}

        {view === "teacher" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black">👩‍🏫 Teacher Dashboard</h2>
            <div className="grid md:grid-cols-4 gap-3">
              <div className="card text-center"><div className="text-2xl font-black">{12}</div><div className="text-xs">Jumlah Siswa</div></div>
              <div className="card text-center"><div className="text-2xl font-black">{store.xp}</div><div className="text-xs">Total XP (demo)</div></div>
              <div className="card text-center"><div className="text-2xl font-black">{store.completedMissions.length}/{missions.length}</div><div className="text-xs">Misi Selesai</div></div>
              <div className="card text-center"><div className="text-2xl font-black">{store.badges.length}</div><div className="text-xs">Badge Diperoleh</div></div>
            </div>
            <div className="card overflow-x-auto">
              <h3 className="font-bold mb-2">📊 Student Progress</h3>
              <table className="w-full text-sm">
                <thead><tr className="border-b font-bold"><th className="text-left p-2">Siswa</th><th>Level</th><th>XP</th><th>Eco</th><th>Misi</th><th>Quiz</th></tr></thead>
                <tbody>
                  {[
                    { name: store.name, level: store.level, xp: store.xp, eco: store.ecoPoints, misi: store.completedMissions.length, quiz: store.quizScore },
                    { name: "Siti", level: 4, xp: 890, eco: 420, misi: 6, quiz: 85 },
                    { name: "Budi", level: 3, xp: 750, eco: 380, misi: 5, quiz: 78 },
                    { name: "Rina", level: 5, xp: 1020, eco: 510, misi: 8, quiz: 92 },
                  ].map((r) => (
                    <tr key={r.name} className="border-b"><td className="p-2 font-semibold">{r.name}</td><td className="text-center">{r.level}</td><td className="text-center">{r.xp}</td><td className="text-center">{r.eco}</td><td className="text-center">{r.misi}</td><td className="text-center">{r.quiz}%</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2 mt-3">
                <button onClick={handleExportCSV} className="btn-secondary text-sm">📥 Export CSV</button>
                <button onClick={() => showToast("Export PDF — gunakan Print → Save as PDF")} className="btn-secondary text-sm">📄 Export PDF</button>
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">📈 Report per Topik</h3>
              {[
                { k: "Karhutla Awareness", v: 82 },
                { k: "Recycling", v: 91 },
                { k: "Reforestation", v: 74 },
                { k: "Water Conservation", v: 88 },
                { k: "Biodiversity", v: 79 },
              ].map((r) => (
                <div key={r.k} className="mb-2"><div className="flex justify-between text-xs font-semibold"><span>{r.k}</span><span>{r.v}%</span></div><div className="progress-track h-2 mt-1"><div className="progress-fill" style={{ width: `${r.v}%` }} /></div></div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-bold">🛠️ Mission & Quiz Management (Guru)</h3>
              <p className="text-sm text-gray-600">Buat misi/quiz baru via data JSON di <code>src/data/</code>. Toggle aktif/nonaktif, atur XP & kesulitan — tanpa ubah core game.</p>
              <div className="grid md:grid-cols-2 gap-2 mt-3">
                {missions.slice(0, 4).map((m) => (
                  <div key={m.id} className="flex items-center gap-2 p-2 border rounded-xl"><span className="flex-1 text-sm font-semibold">{m.title}</span><span className="text-xs bg-eco-100 px-2 py-1 rounded-full">{m.difficulty}</span><span className="text-xs">ON</span></div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold">👥 Kelas</h3>
              <p className="text-sm">Kelas 5A (12 siswa) • Kelas 6B (15 siswa) • Kelompok: Hutan, Sungai, Kota</p>
              <button onClick={() => showToast("Buat kelas baru — fitur segera")} className="btn-primary mt-2 text-sm">+ Buat Kelas</button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-eco-100 flex justify-around py-2 md:hidden z-20">
        {[
          { id: "menu", icon: "🏠", label: "Menu" },
          { id: "world", icon: "🗺️", label: "World" },
          { id: "missions", icon: "📋", label: "Misi" },
          { id: "badges", icon: "🏆", label: "Badge" },
          { id: "teacher", icon: "👩‍🏫", label: "Guru" },
        ].map((n) => (
          <button key={n.id} onClick={() => setView(n.id as View)} className={`flex flex-col items-center text-xs font-bold px-3 py-1 rounded-xl ${view === n.id ? "text-eco-700 bg-eco-50" : "text-gray-500"}`}>
            <span className="text-xl">{n.icon}</span>{n.label}
          </button>
        ))}
      </nav>

      {/* Desktop nav */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-eco-200 rounded-full shadow-lg p-1 gap-1 z-20">
        {[
          { id: "menu", label: "PLAY" },
          { id: "world", label: "WORLD" },
          { id: "missions", label: "MISSIONS" },
          { id: "badges", label: "BADGES" },
          { id: "inventory", label: "INVENTORY" },
          { id: "leaderboard", label: "LEADERBOARD" },
          { id: "learn", label: "LEARN" },
          { id: "settings", label: "SETTINGS" },
          { id: "teacher", label: "TEACHER" },
        ].map((n) => (
          <button key={n.id} onClick={() => setView(n.id as View)} className={`px-4 py-2 rounded-full text-xs font-black ${view === n.id ? "bg-eco-600 text-white" : "text-gray-600 hover:bg-eco-50"}`}>{n.label}</button>
        ))}
      </div>

      <footer className="text-center text-xs text-gray-400 py-8 pb-20">
        EcoGuard EduGame v0.1 • Open Source • Bahasa Indonesia • Tanpa iklan & pay-to-win • Privacy-first
      </footer>
    </div>
  )
}
