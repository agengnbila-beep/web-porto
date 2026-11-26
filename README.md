# Website Portofolio Ageng (.dev) 🚀

Website portofolio modern, interaktif, responsif, dan berkinerja tinggi yang dibangun menggunakan **Next.js (App Router)**, **React**, **Tailwind CSS**, dan **Lucide Icons**.

---

## ✨ Fitur Utama

- 🌐 **Bilingual (ID ⇄ EN)**: Dilengkapi tombol peralihan bahasa instan (Bahasa Indonesia & Bahasa Inggris) untuk jangkauan global maupun lokal.
- 🌓 **Dark & Light Mode**: Desain tema *Modern Dark Slate* dengan aksen neon (Cyan/Indigo) serta mode terang (*Clean Light*) yang nyaman untuk mata.
- ⚡ **Single-Page Navigation**: Navigasi mulus (*smooth scrolling*) ke setiap bagian halaman dengan status navbar *blur backdrop*.
- 🔍 **Project Detail Modal**: Setiap proyek dapat dibuka dalam popup detail untuk menampilkan studi kasus, arsitektur, daftar fitur unggulan, dan link demo/GitHub.
- 💼 **Timeline Karir & Pendidikan**: Filter interaktif antara pengalaman kerja profesional dan riwayat pendidikan.
- 🛠️ **Tech Stack Badges**: Showcase keahlian berdasarkan kategori (*Frontend*, *Backend & Database*, serta *Tools & DevOps*).
- ✉️ **Formulir Kontak Interaktif**: Dilengkapi validasi formulir, notifikasi feedback toast, tombol salin email, dan tautan langsung ke WhatsApp.
- 🎯 **Konfigurasi Terpusat**: Semua data teks, foto, link medsos, dan proyek tersimpan di satu file: [`src/data/portfolio.ts`](file:///d:/ageng/web%20porto%20ageng/src/data/portfolio.ts).

---

## 🛠️ Menjalankan di Komputer Lokal

1. **Jalankan development server**:
   ```bash
   npm run dev
   ```
2. **Buka di peramban**:
   Kunjungi [http://localhost:3000](http://localhost:3000)

---

## 📝 Cara Menyesuaikan Data Diri Anda

Cukup buka file [`src/data/portfolio.ts`](file:///d:/ageng/web%20porto%20ageng/src/data/portfolio.ts) untuk mengedit:
- `personal.name`, `nickname`, dan `bio`
- `personal.email`, `whatsapp`, `github`, dan `linkedin`
- Daftar keahlian pada `skills`
- Daftar proyek pada `projects` (tambah/kurangi proyek, ganti gambar, deskripsi, link demo)
- Riwayat kerja dan pendidikan pada `experiences`

---

## 🚀 Panduan Deployment

Website ini siap di-deploy langsung ke **Vercel** atau **Netlify**:
1. Push kode ke repositori GitHub Anda:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
2. Import repositori Anda di [Vercel](https://vercel.com) atau [Netlify](https://netlify.com).
3. Vercel secara otomatis mendeteksi konfigurasi Next.js tanpa perlu pengaturan tambahan!
