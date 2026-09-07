// Event temporer - konfigurasi dari JSON, mudah ditambah guru
export interface EcoEvent {
  id: string
  title: string
  description: string
  start: string // YYYY-MM-DD
  end: string
  goal: string
  reward: string
  emoji: string
}

export const ecoEvents: EcoEvent[] = [
  {
    id: "earth-day",
    title: "Hari Bumi — 1000 Pohon Challenge",
    description: "Tanam 1000 pohon virtual bersama sekolah se-Indonesia!",
    start: "2026-04-22",
    end: "2026-04-30",
    goal: "Capai 1000 pohon ditanam",
    reward: "Badge Earth Guardian + 500 XP",
    emoji: "🌍",
  },
  {
    id: "environment-day",
    title: "Hari Lingkungan Hidup — Zero Waste Week",
    description: "7 hari tanpa sampah plastik sekali pakai.",
    start: "2026-06-05",
    end: "2026-06-12",
    goal: "Pilah 100 sampah",
    reward: "Badge Zero Waste Hero",
    emoji: "♻️",
  },
  {
    id: "water-day",
    title: "Hari Air — Save Our Water",
    description: "Hemat 10.000 liter air bersama.",
    start: "2026-03-22",
    end: "2026-03-29",
    goal: "Hemat air di 5 misi",
    reward: "Badge Water Protector",
    emoji: "💧",
  },
]

export function getActiveEvent(date = new Date()): EcoEvent | null {
  const iso = date.toISOString().slice(0, 10)
  return ecoEvents.find((e) => iso >= e.start && iso <= e.end) ?? null
}
