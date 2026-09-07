import { api } from "../services/api"

export const quizRepo = {
  getAll: () => api.getQuizzes(),
  getByLevel: (level: number) => api.getQuizzes(level),
}
