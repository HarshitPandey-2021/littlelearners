# 🎓 La English Atelier

> A modern educational platform for children aged 5–8, offering engaging live online English classes, interactive learning experiences, and a secure enrollment & admin management system.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-5-black?style=for-the-badge&logo=express)

**Live site:** https://laenglishatelier.vercel.app/
**API:** https://la-english-atelier-api.onrender.com

---

## ✨ Features

- 🎨 Modern, child-friendly UI with smooth Framer Motion animations
- 📱 Fully responsive — mobile, tablet, and desktop
- 📝 Validated online enrollment system (letters-only names, 10-digit phone, country code selector)
- 🔐 JWT-based authentication with secure cross-domain cookie sessions
- 📊 Protected admin dashboard with edge middleware route guarding
- ☁️ MongoDB Atlas for persistent storage
- 🚀 Decoupled deployment — frontend on Vercel, backend on Render

---

## 🛠 Tech Stack

**Frontend:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide React

**Backend:** Node.js · Express 5 · TypeScript · MongoDB Atlas · Mongoose · JWT · bcryptjs · cookie-parser

**Deployment:** Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

---

## 📂 Project Structure

```text
la-english-atelier/
│
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── enroll/
│   ├── login/
│   └── admin/
│
├── components/
│   ├── ui/
│   └── landing/
│
├── lib/
│   └── config.ts          # API_URL env wrapper
│
├── middleware.ts            # Route guard for /admin/*
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
├── public/
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas account (free tier is fine)

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/la-english-atelier.git
cd la-english-atelier
```

### 2. Frontend setup
```bash
npm install
```
Create `.env.local` in the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Run:
```bash
npm run dev
```
Frontend: http://localhost:3000

### 3. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Fill in `.env`:
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/laenglishatelier
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```
Run:
```bash
npm run dev
```
Backend: http://localhost:5000

---

## 🌐 Production Deployment

### Backend → Render
1. New Web Service → connect repo → **Root Directory: `backend`**
2. Build: `npm install && npm run build`
3. Start: `npm start`
4. Environment variables: `MONGODB_URI`, `JWT_SECRET`, `PORT=5000`, `NODE_ENV=production`, `FRONTEND_URL=<your vercel url>`

### Frontend → Vercel
1. Import repo → Root Directory: project root
2. Environment variable: `NEXT_PUBLIC_API_URL=<your render url>`
3. Deploy

### MongoDB Atlas
- Network Access → allow `0.0.0.0/0` (Render free tier has no static IP)

> ⚠️ After both are deployed, go back to Render and update `FRONTEND_URL` with the real Vercel URL, then redeploy.

---

## 🔐 Security Architecture

- **Passwords:** hashed with bcrypt, never stored in plaintext
- **Sessions:** stateless JWT signed with `JWT_SECRET`, stored in an `httpOnly` cookie (`auth_token`) — inaccessible to JavaScript, immune to XSS token theft
- **Route guarding:** a lightweight, non-sensitive `admin_logged_in` cookie lets edge middleware instantly redirect unauthenticated users, while the real authorization check happens server-side against the signed JWT
- **CORS:** backend only accepts requests from the explicit `FRONTEND_URL` origin, with credentials explicitly enabled for cookie passing
- **Cross-domain cookies:** `secure: true` + `sameSite: 'none'` in production (required since frontend/backend live on different domains); `sameSite: 'lax'` locally

---

## 🧪 API Quick Reference

```bash
# Health check
curl https://la-english-atelier-api.onrender.com/health

# Admin login
curl -X POST https://la-english-atelier-api.onrender.com/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@laenglishatelier.com","password":"yourpassword"}'
```

---

## 🚨 Troubleshooting

| Issue | Fix |
|---|---|
| Admin login works locally but not in production | Check `sameSite`/`secure` cookie flags match `NODE_ENV=production` exactly |
| "Could not connect to server" | Confirm `NEXT_PUBLIC_API_URL` is set correctly in Vercel env vars |
| MongoDB connection error | Check Atlas Network Access allows `0.0.0.0/0`, and `MONGODB_URI` is correct |
| First request very slow | Render free tier sleeps after ~15 min idle — normal, not a bug |

---

## 👥 Team

**Frontend & Design** — Shakti
**Backend & Database** — Harshit

---

## 📄 License

MIT — feel free to use, modify, and learn from this project.
