Platform prototype e-commerce untuk pembelian paket data internet. Dibangun menggunakan **React JS**, **Material UI (MUI)**, dan **json-server** sebagai mock backend API.

> **Tanggal pengerjaan:** 13 Februari 2026  
> **Waktu mulai:** 17:00 WIB  
> **Waktu selesai:** 20:30 WIB

---

## Cara Menjalankan

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Jalankan Aplikasi + JSON Server (Bersamaan)

```bash
pnpm start
```

Perintah ini akan menjalankan:
- **Vite dev server** di `http://localhost:5173`
- **JSON Server** di `http://localhost:3001`

### Atau jalankan terpisah:

```bash
# Terminal 1 — JSON Server
pnpm server

# Terminal 2 — React Dev Server
pnpm dev
```

### 3. Akses Aplikasi

Buka browser: **http://localhost:5173**

### 4. Login Demo

| Email | Password |
|---|---|
| john@example.com | password123 |
| jane@example.com | password123 |

---

## 📡 API Endpoints (json-server)

Base URL: `http://localhost:3001`

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/users` | List semua user |
| GET | `/users/:id` | Detail user |
| POST | `/users` | Register user baru |
| PATCH | `/users/:id` | Update user/saldo |
| GET | `/products` | List semua produk |
| GET | `/products?provider=XL` | Filter produk by provider |
| GET | `/products?q=keyword` | Search produk |
| PATCH | `/products/:id` | Update stok produk |
| GET | `/transactions?userId=1` | Transaksi by user |
| POST | `/transactions` | Buat transaksi baru |

---

## 🔄 Flow Aplikasi

```
Landing Page → Login/Register → Dashboard
                                    ├── Lihat Paket Data (filter/search)
                                    ├── Tambah ke Keranjang
                                    ├── Checkout (input nomor HP → potong saldo → kurangi stok)
                                    ├── Riwayat Transaksi (paginated)
                                    └── Edit Profil
```

