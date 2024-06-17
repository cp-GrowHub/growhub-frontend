<h1 align="center">GrowHub - Pengembangan Diri dan Kolaborasi</h1>

# GrowHub Frontend

GrowHub adalah aplikasi web yang dirancang untuk membantu pengguna mengelola kehidupan mereka, menetapkan tujuan, membuat catatan, berdiskusi, dan berbagi pengalaman atau pengetahuan. Proyek ini dibangun dengan ReactJS dan di-styling menggunakan TailwindCSS.

## Daftar Isi
- [Fitur](#fitur)
- [Instalasi](#instalasi)
- [Deployed Website](#website)
- [Team](#team)

## Fitur
- **Notes**: Mencatat ide-ide penting dan informasi berharga yang ditemukan sehari-hari.
- **To-Do List**: Mengelola daftar tugas dengan mudah dan tetap produktif setiap hari.
- **Goals**: Menetapkan tujuan pribadi dan melacak kemajuan untuk mencapainya.
- **Discussions**: Mengikuti diskusi dan berbagi pandangan dengan komunitas.
- **Blogs**: Membaca artikel dan tulisan inspiratif dari berbagai penulis.
- **Share Notes and Blogs**: Berbagi catatan dan blog dengan pengguna lain atau tamu yang belum terdaftar.

## Instalasi
1. Clone repositori:
    ```sh
    git clone https://github.com/cp-GrowHub/growhub-frontend.git
    cd growhub-frontend
    ```

2. Instal dependensi:
    ```sh
    npm install
    ```

3. Jalankan Server Backend:
   > Silahkan baca di sini untuk panduan instalasi backend [GrowHub Backend](https://github.com/cp-GrowHub/growhub-backend)

4. Atur base URL API:
   Buka file `vite.config.js` dan atur variabel `target` ke URL API Backend anda
   ```js
   proxy: {
      '/api': {
        target: 'URL_BACKEND_ANDA',
      },
   },
   ```
5. Jalankan di lokal
    ```sh
    npm run dev
    ```

## Website
[GrowHub (Vercel)](https://growhub-frontend-beta.vercel.app/)

## Team
Team ID: `C624-PS131`

Anggota Tim
| ID Siswa     | Nama                     | Kelas | GitHub Profile                        |
|--------------|--------------------------|-------|---------------------------------------|
| R0096YB455   | Faisal                   | R-02  | [Hypoow](https://github.com/Hypoow)   |
| R3196YB453   | Abby Fakhri Choiry       | R-03  | [abbyfakhri](https://github.com/abbyfakhri) |
| R3596YB431   | Rafi Syihab              | R-02  | [rfsyhb](https://github.com/rfsyhb)   |
