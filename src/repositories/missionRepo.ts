import { api } from "../services/api"
import type { Mission } from "../models/types"

export const missionRepo = {
  getAll: (): Promise<Mission[]> => api.getMissions(),
  getById: async (id: string) => (await api.getMissions()).find((m) => m.id === id) ?? null,
  getByLevel: async (level: number) => (await api.getMissions()).filter((m) => m.level === level),
}
