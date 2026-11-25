# Lorekeeper

**Lorekeeper** adalah aplikasi web pelacak katalog dan koleksi game PC (*Game Archive & Vault*). Pengguna dapat menelusuri daftar promo game dari CheapShark API, menyimpan game pilihan ke dalam *My Vault* secara permanen, memperbarui status bermain (`BACKLOG`, `PLAYING`, `COMPLETED`) beserta catatan *Play Journal*, serta melihat ringkasan statistik di halaman *Analytics*.

## Struktur Proyek (Monorepo)

- `frontend/` — Antarmuka web berbasis **React + Vite + Tailwind CSS**
- `backend/` — REST API berbasis **NestJS + Prisma ORM + PostgreSQL**

## Fitur Utama

- **Directory (`ExplorePage`)**: Menampilkan katalog game dan harga diskon dari CheapShark API.
- **My Vault (`VaultPage`)**: Operasi CRUD lengkap (tambah, lihat, filter berdasarkan status/judul, ubah status & catatan, dan hapus game) yang tersimpan permanen di PostgreSQL.
- **Analytics (`AnalyticsPage`)**: Menampilkan ringkasan total game, distribusi status bermain, rata-rata skor Metacritic & Steam Rating, serta total penghematan diskon melalui endpoint `GET /games/stats`.

## Cara Menjalankan

### 1. Backend (NestJS + Prisma + PostgreSQL)

```bash
cd backend
npm install
# Atur DATABASE_URL di file .env sesuai koneksi PostgreSQL (pgAdmin)
npx prisma migrate dev --name init_vault_game
npm run start:dev
```

Backend berjalan di `http://localhost:3000`.

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`.
