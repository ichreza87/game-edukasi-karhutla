import { useState } from "react"
import { getLang, setLang, type Lang } from "../services/i18n"

export function useLang() {
  const [lang, setL] = useState<Lang>(getLang())
  const toggle = () => {
    const next: Lang = lang === "id" ? "en" : "id"
    setLang(next)
    setL(next)
  }
  return { lang, toggle }
}
