# 🎓 LittleLearners Academy

> A modern educational platform designed for children aged **5–8 years**, offering engaging live classes, interactive learning experiences, and seamless enrollment management.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge\&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge\&logo=mongodb)

---

## ✨ Features

* 🎨 Modern and child-friendly UI
* 📱 Fully responsive design
* 📝 Online enrollment system
* 👨‍🏫 Program and class management
* 🔐 JWT-based authentication
* 📊 Admin dashboard
* ⚡ Fast Next.js frontend
* ☁️ MongoDB Atlas integration
* 🎭 Smooth animations with Framer Motion

---

# 🛠 Tech Stack

## Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Cookie-based Sessions

---

# 📂 Project Structure

```text
littlelearners/
│
├── app/
│   ├── page.tsx
│   ├── enroll/
│   └── admin/
│
├── components/
│   ├── ui/
│   └── landing/
│
├── lib/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   │
│   ├── .env.example
│   └── package.json
│
├── public/
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm or yarn
* Git
* MongoDB Atlas account

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/littlelearners.git
cd littlelearners
```

---

# 🎨 Frontend Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:3000
```

---

# ⚙️ Backend Setup

Move into backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Update `.env`:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/littlelearners

JWT_SECRET=your-secret-key

PORT=5000

NODE_ENV=development

FRONTEND_URL=http://localhost:3000
```

Start backend server:

```bash
npm run dev
```

Backend will be available at:

```text
http://localhost:5000
```

---

# 🧪 API Testing

## Health Check

```bash
curl http://localhost:5000/health
```

Expected Response:

```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## Create Enrollment

```bash
curl -X POST http://localhost:5000/api/v1/enrollments \
-H "Content-Type: application/json" \
-d '{
  "childName":"Emma Watson",
  "childAge":6,
  "parentName":"John Watson",
  "phone":"+1234567890",
  "email":"john@example.com",
  "program":"PROGRAM_ID",
  "classMode":"online"
}'
```

---

# 🎨 Design System

### Colors

| Token            | Value   |
| ---------------- | ------- |
| Primary          | #5B4FE8 |
| Secondary        | #FF8A3D |
| Accent           | #FFC93C |
| Success          | #22C08E |
| Background Cream | #FFFBF5 |
| Ink              | #1E1B3A |

### Typography

* Fredoka — Headings
* Plus Jakarta Sans — Body Text

---

# 📱 Responsive Support

The platform is optimized for:

* ✅ Mobile (375px+)
* ✅ Tablet (768px+)
* ✅ Desktop (1024px+)
* ✅ Large Screens (1440px+)

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory:

```env
MONGODB_URI=
JWT_SECRET=
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Important

Never commit `.env` files.

Only commit:

```text
.env.example
```

---

# 🚨 Common Issues

## MongoDB Connection Error

* Verify MongoDB URI.
* Ensure IP is whitelisted in MongoDB Atlas.
* Confirm database name is correct.

---

## Port Already In Use

Windows:

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Mac/Linux:

```bash
lsof -ti:3000 | xargs kill -9
```

---

## Frontend Cannot Connect To Backend

Check:

* Backend server is running.
* FRONTEND_URL matches frontend URL.
* CORS configuration is correct.

---

# 🤝 Contributing

## Sync Latest Changes

```bash
git pull origin main
```

## Create Feature Branch

```bash
git checkout -b feature/your-feature
```

## Commit Changes

```bash
git add .
git commit -m "Add: feature description"
```

## Push Branch

```bash
git push origin feature/your-feature
```

Create a Pull Request on GitHub.

---

# 🌿 Recommended Git Workflow

```bash
git pull origin main

git checkout -b feature/enrollment-form

# Work on feature

git add .
git commit -m "Add enrollment form validation"

git push origin feature/enrollment-form
```

---


# 👥 Team

### Frontend & Design

Your Name

### Backend & Database

Friend's Name

---

# 📄 License

MIT License

Feel free to use, modify, and learn from this project.

---

# ❤️ Acknowledgements

Built with Next.js, TypeScript, MongoDB, and a passion for making learning fun for young minds.
