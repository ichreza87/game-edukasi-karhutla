// IndexedDB wrapper — untuk data besar (quiz, progress detail) bila localStorage penuh
// Fallback ke localStorage jika IndexedDB tidak tersedia

export function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (!("indexedDB" in window)) return resolve(null)
    const req = indexedDB.open("ecoguard", 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv")
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => resolve(null)
  })
}

export async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDB()
  if (!db) { localStorage.setItem(`idb_${key}`, JSON.stringify(value)); return }
  const tx = db.transaction("kv", "readwrite")
  tx.objectStore("kv").put(value, key)
}

export async function idbGet<T>(key: string): Promise<T | null> {
  const db = await openDB()
  if (!db) {
    const raw = localStorage.getItem(`idb_${key}`)
    return raw ? (JSON.parse(raw) as T) : null
  }
  return new Promise((resolve) => {
    const req = db.transaction("kv", "readonly").objectStore("kv").get(key)
    req.onsuccess = () => resolve((req.result as T) ?? null)
    req.onerror = () => resolve(null)
  })
}
