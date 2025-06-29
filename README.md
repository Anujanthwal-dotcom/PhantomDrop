
---

# 🚀 PhantomDrop

**PhantomDrop** is a secure, code-based file sharing application built with the MERN stack (MongoDB, Express, React, Node.js + TypeScript). It allows users to upload files and share them via a one-time code. All files are stored in encrypted form and self-destruct either after 10 minutes or immediately after download.

---

## 🔐 Features

* ⚡ **Code-based Sharing** — Share files using an auto-generated secure code.
* 🔒 **Encrypted Storage** — Files are encrypted before storage for maximum security.
* 🕒 **10-Minute Expiry** — Files are automatically deleted after 10 minutes.
* 💣 **One-time Download** — Files are deleted immediately after a successful download.
* ⚛️ **Frontend** — Built with React + Vite + TailwindCSS.
* 🛠️ **Backend** — Built with Express.js + TypeScript + MongoDB.

---

## 🖥️ Tech Stack

### Frontend

* **React 19**
* **Redux Toolkit**
* **React Router DOM**
* **TailwindCSS**
* **Vite**

### Backend

* **Express 5**
* **MongoDB with Mongoose**
* **TypeScript**
* **Multer (for file handling)**
* **NanoID (for code generation)**
* **Rate Limiter & CORS**

---

## 📁 Project Structure

```
phantomdrop/
├── frontend/           # React + Vite client
│   ├── src/
│   ├── public/
│   └── vite.config.ts
├── backend/            # Express + TypeScript API
│   ├── src/
│   └── .env
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 18
* MongoDB running locally or cloud URI
* pnpm / npm / yarn

### Clone the repository

```bash
git clone https://github.com/your-username/phantomdrop.git
cd phantomdrop
```

### 🧩 Backend Setup

```bash
cd backend
pnpm install
cp .env.example .env  # Fill in your Mongo URI and encryption secret
pnpm dev              # Start development server with nodemon
```

### 🌐 Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev              # Starts Vite dev server
```

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
ENCRYPTION_KEY=your_32_byte_encryption_key
```

---

## 📦 Production Build

```bash
# Build backend
cd backend
pnpm build

# Build frontend
cd frontend
pnpm build
```

---

## 📸 Demo

*Coming soon…*

---

## 🧠 Future Plans

* Drag and drop upload support
* Password-protected file codes
* File size and type limits
* Progressive Web App (PWA) support
* Analytics dashboard for admin

---

## 🛡️ License

This project is licensed under the MIT License. See `LICENSE` file for details.

---
