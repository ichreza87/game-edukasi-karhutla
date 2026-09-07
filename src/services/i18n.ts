// i18n siap untuk id-ID (default) dan en-US
// Jangan hard-code UI string di komponen besar — gunakan t()
export type Lang = "id" | "en"

const dict: Record<Lang, Record<string, string>> = {
  id: {
    play: "MAIN",
    missions: "MISI",
    world: "DUNIA",
    badges: "LENCANA",
    leaderboard: "PAPAN SKOR",
    learn: "BELAJAR",
    settings: "PENGATURAN",
    teacher: "GURU",
    start: "Mulai Misi",
    missionComplete: "MISI SELESAI!",
    ecoBalance: "ECO BALANCE",
  },
  en: {
    play: "PLAY",
    missions: "MISSIONS",
    world: "WORLD",
    badges: "BADGES",
    leaderboard: "LEADERBOARD",
    learn: "LEARN",
    settings: "SETTINGS",
    teacher: "TEACHER",
    start: "Start Mission",
    missionComplete: "MISSION COMPLETE!",
    ecoBalance: "ECO BALANCE",
  },
}

let current: Lang = (localStorage.getItem("ecoguard_lang") as Lang) || "id"

export function t(key: string): string {
  return dict[current][key] ?? key
}
export function getLang(): Lang { return current }
export function setLang(l: Lang) {
  current = l
  localStorage.setItem("ecoguard_lang", l)
}
export const i18n = { t, getLang, setLang }
