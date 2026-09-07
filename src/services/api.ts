// API Layer abstraction — local-first sekarang, siap sambung backend nanti
// Frontend → api → (localStorage | fetch backend) → repo
import type { Mission, QuizQuestion } from "../models/types"
import { missions } from "../data/missions"
import { quizzes } from "../data/quizzes"
import { loadPlayer, savePlayer } from "./storage"

// Simulasi latency biar terasa seperti API
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const api = {
  async getMissions(): Promise<Mission[]> {
    await delay(80)
    return missions
  },
  async getQuizzes(level?: number): Promise<QuizQuestion[]> {
    await delay(60)
    return level ? quizzes.filter((q) => q.level === level) : quizzes
  },
  async getPlayer() {
    await delay(40)
    return loadPlayer()
  },
  async savePlayer(p: Parameters<typeof savePlayer>[0]) {
    await delay(30)
    savePlayer(p)
  },
  // Nanti ganti dengan fetch("/api/...") — interface tetap sama
}
