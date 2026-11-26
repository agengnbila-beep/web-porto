# Website Portofolio Ageng (.dev) + Admin CMS + Supabase 🚀

Website portofolio modern, interaktif, responsif, dan berkinerja tinggi yang dilengkapi dengan **Website Admin CMS terintegrasi** di `/admin` dan **dukungan Cloud Database Supabase (PostgreSQL)**.

Dibangun menggunakan **Next.js (App Router)**, **React**, **Tailwind CSS**, **Supabase**, dan **Lucide Icons**.

---

## ⚡ Arsitektur Hybrid Database (Local File & Supabase)

Sistem database dirancang secara cerdas:
- **Default (Localhost)**: Jika Supabase belum dikonfigurasi, data otomatis disimpan di file lokal `src/data/portfolio.json`. Aplikasi tetap berjalan 100% lancar tanpa error.
- **Supabase Mode (Cloud Database)**: Begitu Anda memasukkan URL & Key Supabase, sistem otomatis beralih ke cloud database PostgreSQL Supabase. Perubahan data di `/admin` langsung tersimpan abadi di cloud.

---

## 🗄️ Panduan Menghubungkan ke Supabase (Gratis - 2 Menit)

1. **Buat Project di Supabase**:
   - Buka [database.new](https://database.new) (atau [supabase.com](https://supabase.com)) dan buat project baru (gratis).
2. **Jalankan SQL Schema**:
   - Di dashboard Supabase, buka menu **SQL Editor** di sidebar kiri.
   - Buka file [`supabase/schema.sql`](file:///d:/ageng/web%20porto%20ageng/supabase/schema.sql), salin kodenya, lalu paste di SQL Editor Supabase dan klik **Run**.
3. **Ambil API Keys**:
   - Masuk ke menu **Project Settings** > **API**.
   - Salin `Project URL`, `anon public key`, dan `service_role secret key`.
4. **Masukkan ke File `.env.local`** (atau Environment Variables di Vercel):
   ```env
   ADMIN_PASSWORD=admin123
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
   ```
5. **Selesai!** Saat Anda membuka halaman `/admin`, status database akan berubah menjadi `● Supabase (Cloud PostgreSQL)` dan data awal portofolio akan otomatis ter-seed ke Supabase.

---

## 🔐 Website Admin Dashboard (`/admin`)

- **URL Admin**: [http://localhost:3000/admin](http://localhost:3000/admin) *(atau klik ikon gembok di footer)*
- **Default Password**: `admin123`
- **Fitur Dashboard**:
  - 👤 **Profil & Bio**: Ubah nama, panggilan, bio bilingual (ID & EN), kontak email, WhatsApp, sosmed, avatar, dan statistik.
  - 🚀 **Manajemen Proyek (CRUD)**: Tambah, edit, dan hapus proyek portofolio, upload link thumbnail, set tag tech stack, dan toggle status *Featured*.
  - ⚡ **Keahlian (Skills)**: Kelola skill per kategori (*Frontend*, *Backend*, *Tools*) beserta level keahlian.
  - 🎓 **Pengalaman & Pendidikan**: Kelola timeline pekerjaan dan studi.
  - 💾 **Backup JSON**: Unduh file cadangan data portofolio kapan saja.

---

## 🛠️ Menjalankan di Komputer Lokal

```bash
npm run dev
```
Buka peramban di:
- Halaman Publik: [http://localhost:3000](http://localhost:3000)
- Panel Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🚀 Panduan Deployment ke Vercel

1. Push repository ini ke GitHub Anda.
2. Di dashboard Vercel, import repository **`web-porto`**.
3. Tambahkan Environment Variables:
   - `ADMIN_PASSWORD` = `<password_admin_anda>`
   - `NEXT_PUBLIC_SUPABASE_URL` = `<url_supabase_anda>`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<anon_key_anda>`
   - `SUPABASE_SERVICE_ROLE_KEY` = `<service_role_key_anda>`
4. Klik **Deploy**!
