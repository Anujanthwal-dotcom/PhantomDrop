<table align="center" style="border-collapse: collapse; margin: 20px auto; background: #0d0d1a; border: 1px solid #333366; border-radius: 12px; overflow: hidden; box-shadow: 0 0 30px rgba(60, 60, 140, 0.2);">
  <tr>
    <td align="center" style="padding: 16px 32px 4px; font-family: 'Courier New', monospace; color: #8888dd; line-height: 1.3; font-size: 13px; white-space: pre;">
    ____  _           _              ____
   |  _ \| |__  _ __ | |_ ___ _ __  |  _ \ _ __ ___   ___  ___
   | |_) | '_ \| '_ \| __/ _ \ '_ \ | | | | '__/ _ \ / _ \/ __|
   |  __/| | | | | | | ||  __/ | | || |_| | | | (_) | (_) \__ \
   |_|   |_| |_|_| |_|\__\___|_| |_||____/|_|  \___/ \___/|___/
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 0 32px 8px; font-size: 14px; letter-spacing: 0.5px;">
      <span style="color: #aaaae0;">🕵️ Share files that vanish into thin air.</span><br>
      <span style="color: #7777aa; font-size: 12px;">One code. One download. 10 minutes. Then poof. 💨</span>
    </td>
  </tr>
</table>

---

**PhantomDrop** is a secure, code-based file sharing app. Upload a file, get a one-time 8-digit code, share it — and the file self-destructs after download or 10 minutes. Files are encrypted at rest with **AES-256-CBC**. No trace. No clutter. Just pure, ephemeral sharing.

> 🧠 Built with the **MERN stack** (MongoDB, Express, React, Node.js) + **TypeScript** end-to-end.

---

## ✨ Features

| What | How |
|---|---|
| **Code-based sharing** | Upload → get an 8-digit NanoID code → share it |
| **Encrypted storage** | AES-256-CBC encryption before anything touches disk |
| **Self-destruct** | Files vanish after 10 min **or** right after first download |
| **Rate-limited downloads** | 5 requests per 2 min per IP — keeps things fair |
| **Dark & sleek UI** | React + TailwindCSS with a moody, modern vibe |

---

## 🗺️ Project Layout

```
phantom-drop/
│
├── phantom-backend/           # Express + TypeScript API server
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── connections/       # MongoDB connection
│   │   ├── controllers/       # Upload & download logic
│   │   ├── middlewares/       # Multer upload & rate limiter
│   │   ├── models/            # Mongoose schemas (File, Code)
│   │   └── services/          # Encryption, DB operations
│   ├── encrypted/             # Encrypted file storage
│   ├── uploads/               # Temp upload directory
│   └── .env                   # Config (PORT, MONGO_URI, keys)
│
├── phantom-frontend/          # React + Vite client
│   ├── src/
│   │   ├── mainsection/       # Main UI with Send/Receive modals
│   │   ├── popup/             # Send flow (SelectFile → Code)
│   │   │   └── sendpagewindows/
│   │   ├── redux/             # Redux Toolkit store & slices
│   │   ├── types/             # TypeScript type definitions
│   │   ├── assets/            # Logo & static assets
│   │   └── baseurl/           # API base URL config
│   └── vite.config.ts
│
└── README.md                  # You are here 🌟
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (local or Atlas)
- **pnpm** (or npm / yarn)

### Clone & Install

```bash
git clone https://github.com/your-username/phantomdrop.git
cd phantom-drop
```

### 🔧 Backend

```bash
cd phantom-backend
pnpm install
cp .env.example .env   # edit with your Mongo URI & encryption keys
pnpm dev               # starts on http://localhost:3000
```

### 🌐 Frontend

```bash
cd phantom-frontend
pnpm install
pnpm dev               # starts on http://localhost:5173
```

---

## ⚙️ Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/phantomdrop` |
| `ENCRYPTION_KEY` | 32-byte key for AES-256-CBC | *(set in .env)* |
| `ENCRYPTION_IV` | 16-byte IV for AES-256-CBC | *(set in .env)* |
| `STORAGE_PATH` | Temp upload directory | `uploads` |
| `ENCRYPTED_STORAGE_PATH` | Encrypted file directory | `encrypted` |

---

## 🧪 How It Works

```
                📤 Upload                          📥 Download
   ┌──────┐              ┌──────────┐              ┌──────┐
   │ You  │ ── file ──▶  │ Backend  │ ◀── code ──  │ Them │
   └──────┘              └──────────┘              └──────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              🔐 Encrypted         🗄️ MongoDB
              File on Disk       (File + Code docs)
                                   (TTL: 10 min)
```

1. **Upload** → File lands in `uploads/`, gets encrypted → moved to `encrypted/`, original deleted.
2. **Code** → A unique 8-digit numeric code is generated and stored in MongoDB with a 10-min TTL.
3. **Download** → Code is entered → file is decrypted on-the-fly and streamed → code & file records deleted → encrypted file deleted from disk. 💥

---

## 📸 Demo

Check out the live demo: [**phantomdrop.vercel.app**](https://phantomdrop.vercel.app)

---

## 🧠 Future Plans

- [ ] Drag & drop upload
- [ ] Password-protected codes
- [ ] File size & type limits
- [ ] PWA support
- [ ] Admin analytics dashboard
- [ ] End-to-end encryption

---

## 🛡️ License

**MIT** — do whatever you want, just don't blame us if something goes *poof*.

---

<p align="center">
  <sub>Made with ☕ and 🧠 by <strong>Anuj Anthwal</strong></sub>
</p>
