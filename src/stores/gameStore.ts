import { create } from "zustand"
import type { PlayerState } from "../models/types"
import { calcLevel } from "../models/types"
import { loadPlayer, savePlayer, resetPlayer } from "../services/storage"
import { badges } from "../data/badges"

interface GameStore extends PlayerState {
  // actions
  addXP: (amount: number) => void
  addEcoPoints: (n: number) => void
  addCoins: (n: number) => void
  completeMission: (id: string, xp: number, eco: number, coin: number, badgeId?: string) => void
  unlockBadge: (id: string) => void
  updateCombo: (correct: boolean) => void
  setName: (name: string) => void
  setAvatar: (avatar: string) => void
  reset: () => void
  checkStreak: () => void
  addInventory: (item: string) => void
}

function persist(get: () => GameStore) {
  const { addXP: _a, addEcoPoints: _b, addCoins: _c, completeMission: _d, unlockBadge: _e, updateCombo: _f, setName: _g, setAvatar: _h, reset: _i, checkStreak: _j, addInventory: _k, ...state } = get() as unknown as Record<string, unknown>
  savePlayer(state as unknown as PlayerState)
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...loadPlayer(),

  addXP: (amount) =>
    set((s) => {
      const xp = s.xp + amount
      const level = calcLevel(xp)
      const ns = { ...s, xp, level }
      queueMicrotask(() => persist(get))
      return ns
    }),

  addEcoPoints: (n) =>
    set((s) => {
      const ns = { ...s, ecoPoints: s.ecoPoints + n }
      queueMicrotask(() => persist(get))
      return ns
    }),

  addCoins: (n) =>
    set((s) => {
      const ns = { ...s, coins: s.coins + n }
      queueMicrotask(() => persist(get))
      return ns
    }),

  completeMission: (id, xp, eco, coin, badgeId) =>
    set((s) => {
      if (s.completedMissions.includes(id)) return s
      const xp2 = s.xp + xp
      const badges2 = badgeId && !s.badges.includes(badgeId) ? [...s.badges, badgeId] : s.badges
      // auto badges
      const autoBadges = [...badges2]
      if (xp2 >= 100 && !autoBadges.includes("green-starter")) autoBadges.push("green-starter")
      const ns = {
        ...s,
        xp: xp2,
        level: calcLevel(xp2),
        ecoPoints: s.ecoPoints + eco,
        coins: s.coins + coin,
        completedMissions: [...s.completedMissions, id],
        badges: autoBadges,
        totalMissions: s.totalMissions + 1,
      }
      // check badge unlocks for counts
      if (ns.badges.length === 0 && ns.completedMissions.length >= 1) {
        const b = badges.find((x) => x.id === "green-starter")
        if (b && !ns.badges.includes(b.id)) ns.badges.push(b.id)
      }
      queueMicrotask(() => persist(get))
      return ns
    }),

  unlockBadge: (id) =>
    set((s) => {
      if (s.badges.includes(id)) return s
      const ns = { ...s, badges: [...s.badges, id] }
      queueMicrotask(() => persist(get))
      return ns
    }),

  updateCombo: (correct) =>
    set((s) => {
      const combo = correct ? s.combo + 1 : 0
      const maxCombo = Math.max(s.maxCombo, combo)
      let ns: Partial<GameStore> = { combo, maxCombo } as Partial<GameStore>
      // bonus XP for combo
      if (correct && combo === 3) ns = { ...ns, xp: s.xp + 10, ecoPoints: s.ecoPoints + 5 } as Partial<GameStore>
      if (correct && combo === 5) ns = { ...ns, xp: s.xp + 25, ecoPoints: s.ecoPoints + 10 } as Partial<GameStore>
      if (correct && combo >= 10) {
        const extra = 50
        if (!s.badges.includes("combo-10")) {
          queueMicrotask(() => get().unlockBadge("combo-10"))
        }
        ns = { ...ns, xp: s.xp + extra } as Partial<GameStore>
      }
      const final = { ...s, ...ns, level: calcLevel(((ns as unknown as PlayerState).xp ?? s.xp)) }
      queueMicrotask(() => persist(get))
      return final
    }),

  setName: (name) =>
    set((s) => {
      const ns = { ...s, name }
      queueMicrotask(() => persist(get))
      return ns
    }),

  setAvatar: (avatar) =>
    set((s) => {
      const ns = { ...s, avatar }
      queueMicrotask(() => persist(get))
      return ns
    }),

  addInventory: (item) =>
    set((s) => {
      if (s.inventory.includes(item)) return s
      const ns = { ...s, inventory: [...s.inventory, item] }
      queueMicrotask(() => persist(get))
      return ns
    }),

  reset: () => {
    resetPlayer()
    const fresh = loadPlayer()
    set(fresh)
  },

  checkStreak: () =>
    set((s) => {
      const today = new Date().toISOString().slice(0, 10)
      if (s.lastPlayDate === today) return s
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      const streak = s.lastPlayDate === yesterday ? s.streak + 1 : 1
      const ns = { ...s, streak, lastPlayDate: today }
      // streak badge
      if (streak >= 7 && !s.badges.includes("streak-7")) ns.badges = [...ns.badges, "streak-7"]
      queueMicrotask(() => persist(get))
      return ns
    }),
}))
