# CONTRIBUTING

## Setup

```bash
npm install
npm run dev
npm test
```

## Branch & Commit

- Branch: `feat/nama-fitur`, `fix/nama-bug`
- Commit: `feat:`, `fix:`, `docs:`, `chore:` (conventional commits)

## PR

- Satu PR satu concern, sertakan screenshot jika UI.
- `npm run lint && npm test && npm run build` harus hijau.

## Menambah Misi/Quiz/Aset

- Misi: `src/data/missions.ts`
- Quiz: `src/data/quizzes.ts`
- Aset: taruh di `public/assets/` dan catat di `ASSETS_LICENSE.md` (hanya CC0/public domain).
