import { describe, it, expect } from "vitest"
import { toCSV } from "../src/utils/export"
import { getActiveEvent } from "../src/data/events"
import { ecoFacts } from "../src/data/levels"

describe("export", () => {
  it("toCSV", () => {
    const csv = toCSV([{ name: "A", level: 1, xp: 100, eco: 50, missions: 1, quiz: 80, badges: ["a"] }])
    expect(csv).toContain("Nama")
    expect(csv).toContain("A,1,100")
  })
})

describe("events", () => {
  it("getActiveEvent returns null or event", () => {
    const e = getActiveEvent(new Date("2026-04-23"))
    expect(e?.id).toBe("earth-day")
    expect(getActiveEvent(new Date("2026-01-01"))).toBeNull()
  })
})

describe("facts", () => {
  it("facts populated", () => expect(ecoFacts.length).toBeGreaterThanOrEqual(10))
})
