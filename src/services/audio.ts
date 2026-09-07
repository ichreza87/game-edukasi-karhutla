// Audio CC0 placeholder — gunakan WebAudio synthesize, ganti dengan file CC0 bila ada
// Simpan volume/mute di localStorage, hormati prefers-reduced-motion? tidak, tapi sediakan mute
let muted = localStorage.getItem("ecoguard_muted") === "1"
let volume = Number(localStorage.getItem("ecoguard_volume") ?? "0.8")

function beep(freq: number, dur: number, type: OscillatorType = "sine") {
  if (muted) return
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.value = volume * 0.3
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur)
    setTimeout(() => { o.stop(); ctx.close() }, dur * 1000)
  } catch { /* ignore if AudioContext blocked */ }
}

export const audio = {
  click: () => beep(800, 0.08, "square"),
  success: () => { beep(600, 0.15); setTimeout(() => beep(900, 0.2), 120) },
  levelUp: () => { beep(500, 0.15); setTimeout(() => beep(700, 0.15), 140); setTimeout(() => beep(1000, 0.25), 280) },
  isMuted: () => muted,
  setMuted: (v: boolean) => { muted = v; localStorage.setItem("ecoguard_muted", v ? "1" : "0") },
  getVolume: () => volume,
  setVolume: (v: number) => { volume = Math.max(0, Math.min(1, v)); localStorage.setItem("ecoguard_volume", String(volume)) },
}
