# RPP Pramuka Kaffah

Aplikasi web statis untuk mengelola Rencana Pelaksanaan Pembelajaran (RPP) Pramuka di SDIT Kaffah Islamic School. Single-page app — buka `index.html` langsung di browser, tidak perlu build atau server.

## Fitur

- Login 15 akun Pembina (password seragam: `123456789`)
- Pemilihan cepat materi SKU Siaga (22) & Penggalang (23) — isi form otomatis
- Simpan RPP ke cloud via Google Sheets (Google Apps Script)
- Data RPP per akun — setiap Pembina hanya melihat agenda sendiri
- Cetak RPP dalam format rapi siap tanda tangan

## Persyaratan

- Browser modern (Chrome, Firefox, Edge)
- Akun Google (untuk setup Google Sheets + Apps Script)

## Setup Google Sheets (cloud sync)

Agar data tersimpan dan sinkron antar perangkat:

1. **Buat Google Sheet**
   - Buka https://sheets.new
   - Rename "Sheet1" menjadi **RPP**
   - Isi baris 1 (header) dengan: `tanggal | waktu | pembina | golongan | durasi | materi | tujuan | kegiatan | alat | evaluasi | linkLKS | userId | createdAt`

2. **Deploy Google Apps Script**
   - Buka Extensions > Apps Script
   - Hapus kode default, paste isi `apps-script-template.gs`
   - Ganti `YOUR_GOOGLE_SHEET_ID` dengan ID sheet (ambil dari URL: `https://docs.google.com/spreadsheets/d/`**ID_INI**`/edit`)
   - Deploy > New deployment > Web app
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Copy URL Web App

3. **Hubungkan ke aplikasi**
   - Buka `index.html`
   - Cari baris: `const gscriptUrl = 'YOUR_APPS_SCRIPT_WEB_APP_URL';`
   - Ganti dengan URL Web App hasil deploy
   - Buka `index.html` di browser — siap digunakan

## Cara pakai

1. Buka `index.html` di browser
2. Login dengan ID Pembina (daftar akun: `users.txt`)
3. Isi form RPP atau pilih dari bank materi SKU (Siaga/Penggalang)
4. Klik "Simpan Real-Time ke Cloud"
5. Data RPP Anda muncul di tabel bawah — hanya milik Anda
6. Klik "Cetak RPP" untuk mencetak format resmi siap tanda tangan

## Struktur file

```
index.html                 — Aplikasi utama (Vue 3 + Tailwind CSS)
apps-script-template.gs    — Backend Google Apps Script
users.txt                  — Data akun Pembina
materi-siaga.txt           — Bank materi SKU Siaga (22 materi)
materi-penggalang.txt      — Bank materi SKU Penggalang (23 materi)
AGENTS.md                  — Petunjuk untuk AI agent
images (2).png             — Logo Kaffah
pramuka-silhouette-...png  — Logo Tunas Kelapa
```

## Mengelola data

- **Tambah/ubah akun**: Edit array `dataUser` di `index.html` (baris ~363)
- **Tambah/ubah materi**: Edit object `bankMateri` di `index.html` (baris ~311)
- **Ubah data pangkalan**: Edit object `pengaturan` di `index.html` (baris ~379)

## Catatan teknis

- Vue.js 3 & Tailwind CSS via CDN — tidak ada dependensi lokal
- POST menggunakan `mode: 'no-cors'` — response dari Apps Script bersifat opaque
- Auto-sync dari cloud setiap 10 detik setelah login
- Cetak RPP menggunakan CSS `@media print` via `window.print()`
- Bahasa Indonesia di seluruh UI
