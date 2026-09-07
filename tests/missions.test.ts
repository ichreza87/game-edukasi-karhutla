import { describe, it, expect } from "vitest"
import { missions } from "../src/data/missions"
import { quizzes } from "../src/data/quizzes"
import { badges } from "../src/data/badges"

describe("Content", () => {
  it("missions >=10", () => expect(missions.length).toBeGreaterThanOrEqual(10))
  it("missions have required fields", () => {
    for (const m of missions) {
      expect(m.id).toBeTruthy()
      expect(m.title).toBeTruthy()
      expect(m.xpReward).toBeGreaterThan(0)
      expect(m.ecoPointReward).toBeGreaterThan(0)
    }
  })
  it("quizzes >=30", () => expect(quizzes.length).toBeGreaterThanOrEqual(30))
  it("badges >=10", () => expect(badges.length).toBeGreaterThanOrEqual(10))
  it("all quizzes have explanation", () => {
    for (const q of quizzes) expect(q.explanation.length).toBeGreaterThan(10)
  })
})
