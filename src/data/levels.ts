export interface LevelInfo {
  id: number
  title: string
  subtitle: string
  icon: string
  color: string
  region: string
}

export const levels: LevelInfo[] = [
  { id: 1, title: "Kenali Lingkungan", subtitle: "Bersih vs Tercemar", icon: "🌱", color: "bg-emerald-500", region: "Taman Sekolah" },
  { id: 2, title: "Sang Penjaga Hutan", subtitle: "Fungsi & Manfaat Hutan", icon: "🌲", color: "bg-green-600", region: "Hutan Tropis" },
  { id: 3, title: "Misi Karhutla", subtitle: "Cegah Kebakaran Hutan", icon: "🔥", color: "bg-orange-500", region: "Kawasan Hutan" },
  { id: 4, title: "Pahlawan Penghijauan", subtitle: "Benih → Hutan", icon: "🌳", color: "bg-lime-600", region: "Lahan Penghijauan" },
  { id: 5, title: "Selamatkan Sungai", subtitle: "Jaga Kualitas Air", icon: "💧", color: "bg-sky-500", region: "Sungai" },
  { id: 6, title: "Master Daur Ulang", subtitle: "Pilah Sampah", icon: "♻️", color: "bg-teal-600", region: "Area Daur Ulang" },
  { id: 7, title: "Kota Tanpa Sampah", subtitle: "Kurangi & Reuse", icon: "🏙️", color: "bg-indigo-500", region: "Kota" },
  { id: 8, title: "Penjaga Satwa", subtitle: "Habitat & Biodiversitas", icon: "🦁", color: "bg-amber-600", region: "Konservasi" },
  { id: 9, title: "Eco School", subtitle: "Sekolah Adiwiyata", icon: "🏫", color: "bg-violet-600", region: "Sekolah" },
  { id: 10, title: "Eco Guardian", subtitle: "ECO BALANCE 100%", icon: "🌍", color: "bg-eco-600", region: "Eco World" },
]

export const ecoFacts: string[] = [
  "Satu pohon dewasa dapat menyerap 22 kg CO2 per tahun.",
  "Hutan Indonesia adalah rumah bagi 12% mamalia dunia.",
  "Menghemat 1 liter air = menyelamatkan 1 hari minum untuk seseorang.",
  "Sampah organik dapat menjadi kompos dalam 1—3 bulan.",
  "Orangutan menghabiskan 90% waktu di atas pohon.",
  "Sungai Kapuas sepanjang 1.143 km — terpanjang di Indonesia.",
  "Kantong plastik butuh 20 tahun untuk terurai.",
  "Daur ulang 1 ton kertas menyelamatkan 17 pohon.",
  "Terumbu karang Indonesia adalah yang terkaya di dunia.",
  "Matikan lampu 1 jam/hari = hemat 30 kWh per tahun.",
]

export const ecoTips: string[] = [
  "Bawa botol minum dan tas kain ke mana pun!",
  "Pisahkan sampah organik & anorganik dari rumah.",
  "Matikan keran saat menyikat gigi — hemat air!",
  "Tanam satu pohon di halaman bersama keluarga.",
  "Gunakan kertas bolak-balik sebelum didaur ulang.",
  "Tolak sedotan plastik jika tidak perlu.",
  "Ajak teman untuk bersih-bersih lingkungan bersama.",
  "Komposkan sisa makanan dan daun kering.",
  "Naik sepeda atau jalan kaki untuk jarak dekat.",
  "Laporkan asap/api di hutan ke guru atau petugas segera!",
]

export const wasteItems = [
  { id: "w1", name: "Botol Plastik", category: "plastik", emoji: "🧴", tip: "Plastik → daur ulang" },
  { id: "w2", name: "Daun Kering", category: "organik", emoji: "🍂", tip: "Organik → kompos" },
  { id: "w3", name: "Kertas Bekas", category: "kertas", emoji: "📄", tip: "Kertas → daur ulang" },
  { id: "w4", name: "Kaleng Minuman", category: "logam", emoji: "🥫", tip: "Logam → daur ulang" },
  { id: "w5", name: "Baterai Bekas", category: "b3", emoji: "🔋", tip: "B3 → tempat khusus!" },
  { id: "w6", name: "Sisa Nasi", category: "organik", emoji: "🍚", tip: "Organik → kompos" },
  { id: "w7", name: "Botol Kaca", category: "kaca", emoji: "🫙", tip: "Kaca → daur ulang" },
  { id: "w8", name: "Styrofoam", category: "residu", emoji: "🥡", tip: "Residu → TPA" },
  { id: "w9", name: "Kardus", category: "kertas", emoji: "📦", tip: "Kertas → daur ulang" },
  { id: "w10", name: "Kulit Pisang", category: "organik", emoji: "🍌", tip: "Organik → kompos" },
  { id: "w11", name: "Kantong Plastik", category: "plastik", emoji: "🛍️", tip: "Plastik → daur ulang" },
  { id: "w12", name: "Lampu Bekas", category: "b3", emoji: "💡", tip: "B3 → tempat khusus!" },
]
