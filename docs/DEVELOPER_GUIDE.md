# DEVELOPER_GUIDE

## Setup

```bash
npm install
npm run dev
npm test
npm run build
```

## Menambah Misi

Edit `src/data/missions.ts`:

```ts
{ id: "new-001", title: "...", category: "karhutla", difficulty: "easy", level: 3, xpReward: 100, ecoPointReward: 50, coinReward: 20, objectives: [...], educationalMaterial: "...", ecoTip: "...", funFact: "..." }
```

Validasi otomatis `validateMission`.

## Menambah Quiz

Edit `src/data/quizzes.ts` — sertakan `explanation` yang edukatif, bukan hanya "Salah".

## State

Zustand di `src/stores/gameStore.ts` — semua persist ke localStorage via `services/storage.ts`.

## Konvensi

TypeScript strict, reusable components, small functions, modular.
