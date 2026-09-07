# EcoGuard EduGame 🌍

**Mainkan Misinya. Selamatkan Lingkungannya.**

Game edukasi lingkungan untuk siswa SD & SMP, guru, sekolah, dan komunitas pendidikan.

![EcoGuard](https://img.shields.io/badge/version-0.1.0-16a34a) ![License](https://img.shields.io/badge/license-MIT-green) ![PWA](https://img.shields.io/badge/PWA-ready-blue)

## ✨ Features

- 🔥 **Karhutla awareness** — pencegahan, bukan pembakaran
- 🌳 **Penghijauan** — Seed → Sapling → Tree → Forest
- ♻️ **Daur ulang & pilah sampah** — organik, plastik, kertas, logam, B3
- 💧 Konservasi air, ekosistem, perilaku ramah lingkungan
- 🎮 10 level utama + 7 mini-game + 30 quiz
- ⭐ XP, Eco Points, Coins, Badge, Combo, Streak, Inventory, Avatar
- 🗺️ Eco World dinamis — dunia menghijau saat kamu beraksi
- 👩‍🏫 Teacher dashboard — progress, leaderboard, export CSV/PDF
- 📴 Offline support (PWA + localStorage)
- ♿ Aksesibel, responsif (mouse, keyboard, touchscreen)
- 🔒 Privacy-first — tanpa iklan, tanpa pay-to-win, tanpa tracking

## 📸 Screenshots

> Placeholder — jalankan `npm run dev` untuk melihat langsung.

## 🛠️ Tech Stack

TypeScript + React + Vite + Tailwind CSS + Zustand + Vitest + PWA (localStorage/IndexedDB-ready)

## 🚀 Installation

```bash
git clone https://github.com/your-org/ecoguard-edugame.git
cd ecoguard-edugame
npm install
npm run dev
```

Buka http://localhost:5173

## 🏗️ Build

```bash
npm run build
npm run preview
```

## ✅ Test

```bash
npm test
npm run lint
```

## 📁 Project Structure

```
src/
  components/  — Header, ProgressBar, dll
  pages/       — (terintegrasi di App.tsx)
  games/       — PilahSampah, TanamPohon, DetektifKarhutla, BersihkanSungai, EcoQuiz, EcoMemory, BangunEcoSchool
  data/        — missions, quizzes, badges, levels
  models/      — types, level logic
  services/    — storage (local-first)
  stores/      — gameStore (Zustand)
  utils/       — gameLogic (pure, tested)
```

## 👩‍🏫 For Teachers

1. Buka **Try Demo** — tanpa login.
2. Menu **TEACHER MODE** → Dashboard: jumlah siswa, XP, misi, badge.
3. **Student Progress** — tabel level/XP/eco/misi/quiz.
4. **Mission/Quiz Management** — edit JSON di `src/data/` tanpa ubah core.
5. **Leaderboard** dengan kategori apresiasi (Most Improved, Recycling Hero, dll).
6. **Lesson Plans** di `docs/LESSON_PLANS.md` — 10 rencana siap pakai.

## 👨‍💻 For Developers

- Arsitektur **local-first**: `services/storage` → `stores/gameStore` → UI. Siap disambung ke API layer (`repositories/services/models`).
- Tambah misi: edit `src/data/missions.ts` — validasi di `utils/gameLogic.validateMission`.
- Tambah quiz: edit `src/data/quizzes.ts`.
- State: Zustand single store, persist ke localStorage, auto-save.
- Game logic murni di `utils/gameLogic.ts` — unit tested.

## 🔒 Security & Privacy

Tidak mengumpulkan GPS, nomor telepon, atau data sensitif. Identifier minimal. Tanpa analytics pihak ketiga default.

## 📄 Docs

- `docs/GAME_DESIGN.md` — desain game
- `docs/TEACHER_GUIDE.md` — panduan guru
- `docs/DEVELOPER_GUIDE.md` — panduan developer
- `docs/LESSON_PLANS.md` — 10 lesson plan
- `docs/ARCHITECTURE.md` — arsitektur
- `docs/ROADMAP.md` — roadmap

## 🤝 Contributing

Lihat `CONTRIBUTING.md`.

## 📜 License

MIT — lihat `LICENSE`.
