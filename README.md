**PhantomDrop** — Share files that vanish into thin air. Upload, get a one-time 8-digit code, share it. File self-destructs after download or 10 minutes. AES-256-CBC encrypted at rest. MERN + TypeScript.

## Features

- **Code-based sharing** — Upload → get an 8-digit NanoID code → share it
- **Encrypted storage** — AES-256-CBC encryption before anything touches disk
- **Self-destruct** — Files vanish after 10 min or right after first download
- **Rate-limited downloads** — 5 requests per 2 min per IP
- **Dark & sleek UI** — React + TailwindCSS

## Project Layout

```
phantom-drop/
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
│   └── .env                   # Config
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
└── README.md
```

## Getting Started

**Prerequisites:** Node.js ≥ 18, MongoDB, pnpm

```bash
git clone https://github.com/your-username/phantomdrop.git
cd phantom-drop

# Backend
cd phantom-backend
pnpm install
cp .env.example .env   # edit with your Mongo URI & encryption keys
pnpm dev               # → http://localhost:3000

# Frontend
cd phantom-frontend
pnpm install
pnpm dev               # → http://localhost:5173
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/phantomdrop` |
| `ENCRYPTION_KEY` | 32-byte key for AES-256-CBC | *(set in .env)* |
| `ENCRYPTION_IV` | 16-byte IV for AES-256-CBC | *(set in .env)* |
| `STORAGE_PATH` | Temp upload directory | `uploads` |
| `ENCRYPTED_STORAGE_PATH` | Encrypted file directory | `encrypted` |

## How It Works

1. **Upload** → File lands in `uploads/`, gets encrypted → moved to `encrypted/`, original deleted.
2. **Code** → A unique 8-digit numeric code is generated and stored in MongoDB with a 10-min TTL.
3. **Download** → Code is entered → file is decrypted on-the-fly and streamed → code & file records deleted → encrypted file deleted from disk.

## License

**MIT** — do whatever you want, just don't blame us if something goes *poof*.

<p align="center">
  <sub>Made with ☕ and 🧠 by <strong>Anuj Anthwal</strong></sub>
</p>
