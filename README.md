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

<img width="1274" height="1029" alt="Screenshot_2026-02-13_15-59-52" src="https://github.com/user-attachments/assets/5ecd856d-75a5-4904-90e2-2af67c40dc31" />
<img width="1280" height="585" alt="Screenshot_2026-02-13_16-00-03" src="https://github.com/user-attachments/assets/200c2203-4232-4e52-ad2d-00492fbb910e" />
<img width="1274" height="788" alt="Screenshot_2026-02-13_16-00-09" src="https://github.com/user-attachments/assets/0154d159-f16b-4e91-865c-e415d11f97ba" />
<img width="1274" height="673" alt="Screenshot_2026-02-13_15-58-48" src="https://github.com/user-attachments/assets/5f12e2aa-ef96-4036-af54-6ed08f3fcc22" />
<img width="1274" height="1073" alt="Screenshot_2026-02-13_15-59-03" src="https://github.com/user-attachments/assets/35593564-5763-4bc1-9f7c-e492137dfb01" />
<img width="1274" height="638" alt="Screenshot_2026-02-13_15-59-15" src="https://github.com/user-attachments/assets/3de40c67-8995-4405-bc32-3b01db9a3872" />
<img width="1280" height="585" alt="Screenshot_2026-02-13_15-59-29" src="https://github.com/user-attachments/assets/c033f82f-3ae0-46d5-a4f5-dd218f5a6a1a" />
<img width="1274" height="906" alt="Screenshot_2026-02-13_15-59-38" src="https://github.com/user-attachments/assets/67ef3623-d143-4285-ae1f-e2d8a27ad353" />
