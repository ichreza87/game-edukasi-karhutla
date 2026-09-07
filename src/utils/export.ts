// Export CSV/PDF menghormati privasi — opsi nama samaran
export interface ExportRow {
  name: string
  level: number
  xp: number
  eco: number
  missions: number
  quiz: number
  badges: string[]
}

export function toCSV(rows: ExportRow[]): string {
  const header = ["Nama", "Level", "XP", "EcoPoint", "Misi", "Quiz", "Badge"].join(",")
  const lines = rows.map((r) => [r.name, r.level, r.xp, r.eco, r.missions, r.quiz, r.badges.join("|")].join(","))
  return [header, ...lines].join("\n")
}

export function downloadCSV(csv: string, filename = "ecoguard-progress.csv") {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
