import type { PlayerState } from "../models/types"
import { calcLevel } from "../models/types"

const KEY = "ecoguard_player_v1"

export const defaultPlayer: PlayerState = {
  name: "Eco Student",
  avatar: "🌱",
  level: 1,
  xp: 0,
  ecoPoints: 0,
  coins: 0,
  completedMissions: [],
  badges: [],
  inventory: ["bibit-mangga", "sekop-kecil"],
  streak: 1,
  lastPlayDate: new Date().toISOString().slice(0, 10),
  totalMissions: 0,
  quizScore: 0,
  combo: 0,
  maxCombo: 0,
}

export function loadPlayer(): PlayerState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultPlayer }
    const parsed = JSON.parse(raw) as PlayerState
    return { ...defaultPlayer, ...parsed, level: calcLevel(parsed.xp ?? 0) }
  } catch {
    return { ...defaultPlayer }
  }
}

export function savePlayer(p: PlayerState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch (e) {
    console.warn("Save failed", e)
  }
}

export function resetPlayer() {
  localStorage.removeItem(KEY)
}
