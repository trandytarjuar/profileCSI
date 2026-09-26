# CBR Squad Indonesia — Next.js + TypeScript

Prototype website profil CSI dengan beranda, tentang komunitas, 10 daerah, struktur organisasi nasional, Korwil Jabodetabek, Korwil Cikapur, serta regional mandiri Semarang dan Deli Serdang.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Deploy ke Vercel

Push folder project ini ke GitHub, kemudian di Vercel pilih Add New > Project > Import repository > Deploy. Framework Next.js terdeteksi otomatis.

## Catatan sebelum publikasi

- Ganti `public/hero.jpg` dengan foto resmi komunitas yang sudah mendapat izin. Gambar saat ini merupakan visual konsep ilustratif.
- Perbarui kontak contoh `kontak-csi@example.com` pada `app/page.tsx` dengan kontak resmi CSI.
- Nama, foto, masa jabatan pengurus masih placeholder. Struktur berdasarkan informasi yang diberikan, belum divalidasi secara independen.
- Form pendaftaran dan dashboard admin belum tersedia pada prototype ini.
