// EcoGuard EduGame - Domain Models
export type Difficulty = "easy" | "normal" | "advanced"
export type MissionCategory = "lingkungan" | "hutan" | "karhutla" | "penghijauan" | "sungai" | "daur-ulang" | "kota" | "satwa" | "sekolah" | "guardian"

export interface Mission {
  id: string
  title: string
  description: string
  category: MissionCategory
  difficulty: Difficulty
  level: number
  xpReward: number
  ecoPointReward: number
  coinReward: number
  objectives: string[]
  educationalMaterial: string
  ecoTip: string
  funFact: string
  badgeId?: string
  source?: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: "multiple" | "truefalse" | "dragdrop"
  options: string[]
  correctAnswer: number | string
  explanation: string
  difficulty: Difficulty
  category: MissionCategory
  level: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
  category: string
}

export interface PlayerState {
  name: string
  avatar: string
  level: number
  xp: number
  ecoPoints: number
  coins: number
  completedMissions: string[]
  badges: string[]
  inventory: string[]
  streak: number
  lastPlayDate: string | null
  totalMissions: number
  quizScore: number
  combo: number
  maxCombo: number
}

export interface MissionProgress {
  studentId: string
  missionId: string
  status: "not_started" | "in_progress" | "completed"
  score: number
  completedAt?: string
}

export interface EcoWorldState {
  forestHealth: number
  airQuality: number
  waterQuality: number
  wasteManagement: number
  biodiversity: number
  greenArea: number
  communityAwareness: number
}

export interface ClassRoom {
  id: string
  name: string
  teacherId: string
  studentIds: string[]
}

export type WasteCategory = "organik" | "plastik" | "kertas" | "logam" | "kaca" | "b3" | "residu"

export interface WasteItem {
  id: string
  name: string
  category: WasteCategory
  emoji: string
  tip: string
}

// Level thresholds
export const XP_PER_LEVEL = 300
export function calcLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}
export function xpForNextLevel(xp: number): { current: number; needed: number; progress: number } {
  const level = calcLevel(xp)
  const base = (level - 1) * XP_PER_LEVEL
  const current = xp - base
  return { current, needed: XP_PER_LEVEL, progress: current / XP_PER_LEVEL }
}
