import { describe, it, expect, beforeEach } from "vitest"
import { loadPlayer, savePlayer, resetPlayer, defaultPlayer } from "../src/services/storage"

beforeEach(() => localStorage.clear())

describe("storage", () => {
  it("load default", () => {
    const p = loadPlayer()
    expect(p.name).toBe(defaultPlayer.name)
  })
  it("save and load", () => {
    const p = { ...defaultPlayer, xp: 999, name: "Test" }
    savePlayer(p)
    const loaded = loadPlayer()
    expect(loaded.xp).toBe(999)
    expect(loaded.name).toBe("Test")
  })
  it("reset", () => {
    savePlayer({ ...defaultPlayer, xp: 500 })
    resetPlayer()
    expect(loadPlayer().xp).toBe(0)
  })
})
