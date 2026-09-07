import type { Badge } from "../models/types"

export const badges: Badge[] = [
  { id: "green-starter", name: "Green Starter", icon: "🌱", description: "Menyelesaikan misi pertama lingkungan", criteria: "Selesaikan Level 1", category: "lingkungan" },
  { id: "forest-guardian", name: "Forest Guardian", icon: "🌳", description: "Menanam 5 pohon virtual", criteria: "Selesaikan Level 4", category: "penghijauan" },
  { id: "fire-hero", name: "Fire Prevention Hero", icon: "🔥", description: "Mencegah risiko karhutla", criteria: "Selesaikan Level 3 dengan skor 80%+", category: "karhutla" },
  { id: "recycle-master", name: "Recycling Master", icon: "♻️", description: "Memilah 15 sampah dengan benar", criteria: "Akurasi pilah sampah 80%+", category: "daur-ulang" },
  { id: "water-protector", name: "Water Protector", icon: "💧", description: "Menyelamatkan sungai", criteria: "Selesaikan Level 5", category: "sungai" },
  { id: "eco-school-hero", name: "Eco School Hero", icon: "🏫", description: "Membangun sekolah ramah lingkungan", criteria: "Selesaikan Level 9", category: "sekolah" },
  { id: "eco-guardian", name: "Eco Guardian", icon: "🌍", description: "Mencapai ECO BALANCE 100%", criteria: "Selesaikan Level 10", category: "guardian" },
  { id: "quiz-master", name: "Quiz Master", icon: "🧠", description: "Menjawab 10 quiz dengan benar", criteria: "10 jawaban benar", category: "quiz" },
  { id: "streak-7", name: "Eco Streak 7", icon: "🔥", description: "Bermain 7 hari berturut-turut", criteria: "Streak 7 hari", category: "streak" },
  { id: "combo-10", name: "Eco Combo x10", icon: "⚡", description: "10 tindakan benar berturut-turut", criteria: "Combo 10", category: "combo" },
  { id: "wildlife-friend", name: "Wildlife Friend", icon: "🦁", description: "Memulihkan habitat satwa", criteria: "Selesaikan Level 8", category: "satwa" },
  { id: "zero-waste", name: "Zero Waste Hero", icon: "🌿", description: "Menyelesaikan misi Kota Tanpa Sampah", criteria: "Selesaikan Level 7", category: "kota" },
]
