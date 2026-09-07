import { describe, it, expect } from "vitest"
import { calculateXP, classifyWaste, calcEcoBalance, validateMission, checkBadgeUnlock } from "../src/utils/gameLogic"
import { calcLevel, xpForNextLevel } from "../src/models/types"

describe("XP & Level", () => {
  it("calcLevel", () => {
    expect(calcLevel(0)).toBe(1)
    expect(calcLevel(299)).toBe(1)
    expect(calcLevel(300)).toBe(2)
    expect(calcLevel(900)).toBe(4)
  })
  it("xpForNextLevel", () => {
    const r = xpForNextLevel(150)
    expect(r.current).toBe(150)
    expect(r.needed).toBe(300)
    expect(r.progress).toBeCloseTo(0.5)
  })
  it("calculateXP with combo and difficulty", () => {
    expect(calculateXP(100, 0, "easy")).toBe(100)
    expect(calculateXP(100, 3, "easy")).toBe(110)
    expect(calculateXP(100, 5, "normal")).toBe(145)
    expect(calculateXP(100, 10, "advanced")).toBe(200)
  })
})

describe("Badge", () => {
  it("unlock", () => {
    expect(checkBadgeUnlock(["forest-001"], [])).toContain("green-starter")
    expect(checkBadgeUnlock([], [])).toEqual([])
  })
})

describe("Waste", () => {
  it("classify", () => {
    expect(classifyWaste("plastik", "plastik")).toBe(true)
    expect(classifyWaste("organik", "plastik")).toBe(false)
  })
})

describe("EcoBalance", () => {
  it("calc", () => {
    const v = calcEcoBalance({ forestHealth: 100, airQuality: 100, waterQuality: 100, wasteManagement: 100, biodiversity: 100, greenArea: 100, communityAwareness: 100 })
    expect(v).toBe(100)
    const v2 = calcEcoBalance({ forestHealth: 0, airQuality: 0, waterQuality: 0, wasteManagement: 0, biodiversity: 0, greenArea: 0, communityAwareness: 0 })
    expect(v2).toBe(0)
  })
})

describe("validateMission", () => {
  it("valid", () => expect(validateMission({ id: "a", title: "t", xpReward: 10 })).toBe(true))
  it("invalid", () => expect(validateMission({ id: "a" })).toBe(false))
  it("null", () => expect(validateMission(null)).toBe(false))
})
