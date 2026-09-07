# ARCHITECTURE

## Keputusan Penting

- **Vite + React + TypeScript (strict)** — sederhana, mudah dipelajari guru/developer pemula, deploy statis ke GitHub Pages.
- **Tailwind CSS** — utility-first, tanpa CSS berat.
- **Zustand** — state minimal, tanpa boilerplate Redux.
- **local-first** — `services/storage.ts` (localStorage) → `stores/gameStore.ts` → UI. Abstraksi `repositories/services/models/stores` siap sambung backend (API Layer → Backend → DB).
- **Game ringan** — HTML/React, tanpa Phaser/Unity agar mudah dipelajari. Canvas bisa ditambah jika perlu.
- **PWA** — `public/manifest.json` + `public/sw.js` (cache-first), offline untuk sekolah dengan internet terbatas.

## Alur

```
Splash → Main Menu → Choose Profile → Eco World → Choose Mission → Briefing → Gameplay → Result → Edukasi → Reward → Eco World
```

## State

```ts
PlayerState { level, xp, ecoPoints, coins, completedMissions, badges, inventory, streak, combo, maxCombo }
XP_PER_LEVEL = 300, calcLevel(xp) = floor(xp/300)+1
```

## Data

`src/data/missions|quizzes|badges|levels` — JSON terpisah, validasi `validateMission`, guru bisa edit tanpa ubah core.

## Gamifikasi

Learn → Act → Reward → Reflect. Combo x3/x5/x10 bonus XP. Streak harian tanpa memaksa (pengingat sehat).

## Aksesibilitas & Performance

- Keyboard nav, :focus-visible, aria, high contrast, reduced-motion
- Lazy concept, aset ringan (emoji), target Lighthouse >90
