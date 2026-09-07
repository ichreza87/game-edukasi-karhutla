// Pure game logic - unit tested
export function calculateXP(base: number, combo: number, difficulty: string): number {
  const mult = difficulty === "advanced" ? 1.5 : difficulty === "normal" ? 1.2 : 1
  const comboBonus = combo >= 10 ? 50 : combo >= 5 ? 25 : combo >= 3 ? 10 : 0
  return Math.round(base * mult + comboBonus)
}

export function checkBadgeUnlock(completed: string[], badges: string[]): string[] {
  const unlocks: string[] = []
  if (completed.length >= 1 && !badges.includes("green-starter")) unlocks.push("green-starter")
  if (completed.includes("karhutla-001") && !badges.includes("fire-hero")) unlocks.push("fire-hero")
  return unlocks
}

export function classifyWaste(itemCategory: string, chosen: string): boolean {
  return itemCategory === chosen
}

export function calcEcoBalance(stats: { forestHealth: number; airQuality: number; waterQuality: number; wasteManagement: number; biodiversity: number; greenArea: number; communityAwareness: number }): number {
  const vals = Object.values(stats)
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
}

export function validateMission(m: unknown): boolean {
  if (!m || typeof m !== "object") return false
  const o = m as Record<string, unknown>
  return typeof o.id === "string" && typeof o.title === "string" && typeof o.xpReward === "number"
}
