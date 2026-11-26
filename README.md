# Website Portofolio Ageng (.dev) + Admin CMS Panel 🚀

Website portofolio modern, interaktif, responsif, dan berkinerja tinggi yang dilengkapi dengan **Website Admin CMS terintegrasi** di `/admin` untuk mengubah data diri, proyek, keahlian, dan riwayat pekerjaan secara langsung dari web browser tanpa menyentuh kode.

Dibangun menggunakan **Next.js (App Router)**, **React**, **Tailwind CSS**, dan **Lucide Icons**.

---

## 🔐 Website Admin Dashboard (`/admin`)

Untuk mengelola dan mengedit portofolio Anda secara visual:
1. Buka URL: **`http://localhost:3000/admin`**
2. Masukkan password admin default: **`admin123`**
3. Fitur di dalam Dashboard Admin:
   - 👤 **Profil & Bio**: Ubah nama lengkap, nama panggilan, bio (Bahasa Indonesia & English), kontak email, WhatsApp, lokasi, link GitHub, LinkedIn, URL foto profil, dan statistik.
   - 🚀 **Manajemen Proyek (CRUD)**: Tambah proyek baru, edit proyek yang ada, upload link gambar mockup, atur tag teknologi, link demo & repository, serta status *Featured Project*.
   - ⚡ **Keahlian (Skills & Tech Stack)**: Tambah/hapus skill per kategori (Frontend, Backend, DevOps) beserta level keahlian.
   - 🎓 **Pengalaman & Pendidikan**: Kelola riwayat karir dan pendidikan.
   - 💾 **Backup JSON**: Unduh file cadangan (*snapshot*) seluruh konfigurasi data portofolio kapan saja dalam satu klik.
4. Klik tombol **"Simpan Semua"** di pojok kanan atas, dan perubahan akan langsung tampil secara instan di halaman utama website!

> 💡 **Cara Mengubah Password Admin**:  
> Cukup ubah nilai `ADMIN_PASSWORD` di file `.env.local` pada komputer Anda (atau di menu *Environment Variables* Vercel jika sudah di-hosting).

---

## ✨ Fitur Halaman Portofolio Publik

- 🌐 **Bilingual (ID ⇄ EN)**: Dilengkapi tombol peralihan bahasa instan (Bahasa Indonesia & Bahasa Inggris).
- 🌓 **Dark & Light Mode**: Desain tema *Modern Dark Slate* dengan aksen neon (Cyan/Indigo) serta mode terang (*Clean Light*).
- ⚡ **Single-Page Navigation**: Navigasi mulus (*smooth scrolling*) ke setiap bagian halaman dengan status navbar *blur backdrop*.
- 🔍 **Project Detail Modal**: Setiap proyek dapat dibuka dalam popup detail untuk menampilkan studi kasus, arsitektur, daftar fitur unggulan, dan link demo/GitHub.
- 💼 **Timeline Karir & Pendidikan**: Filter interaktif antara pengalaman kerja profesional dan riwayat pendidikan.
- 🛠️ **Tech Stack Badges**: Showcase keahlian berdasarkan kategori (*Frontend*, *Backend & Database*, serta *Tools & DevOps*).
- ✉️ **Formulir Kontak Interaktif**: Dilengkapi validasi formulir, notifikasi feedback toast, tombol salin email, dan tautan langsung ke WhatsApp.

---

## 🛠️ Menjalankan di Komputer Lokal

1. **Jalankan development server**:
   ```bash
   npm run dev
   ```
2. **Buka di peramban**:
   - Halaman Utama: [http://localhost:3000](http://localhost:3000)
   - Panel Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🚀 Panduan Deployment ke Vercel

1. Push repository ke GitHub Anda.
2. Di dashboard Vercel, tambahkan Environment Variable:
   - Key: `ADMIN_PASSWORD`
   - Value: `<password_rahasia_pilihan_anda>`
3. Klik **Deploy**.
