# 🎓 LittleLearners Academy

> A beautiful, modern educational platform for kids aged 5-8. Live interactive classes with certified teachers.

![LittleLearners Hero](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

---

## 🚀 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB Atlas + Mongoose
- JWT Authentication
- Cookie-based sessions

---

## 📦 Project Structure
littlelearners/
├── app/ # Next.js app directory
│ ├── page.tsx # Landing page
│ ├── enroll/ # Enrollment form
│ └── admin/ # Admin dashboard
├── components/
│ ├── ui/ # Reusable UI components
│ └── landing/ # Landing page sections
├── lib/ # Utilities & fonts
├── backend/
│ ├── src/
│ │ ├── models/ # MongoDB schemas
│ │ ├── routes/ # API routes
│ │ ├── middleware/ # Auth & validation
│ │ └── server.ts # Express app
│ └── .env # Backend environment variables
└── README.md

text


---

## 🛠️ Setup Instructions

### Prerequisites

Make sure you have installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git** ([Download](https://git-scm.com/))
- **MongoDB Atlas account** (free tier works!) - [Sign up](https://www.mongodb.com/cloud/atlas/register)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/littlelearners.git
cd littlelearners
2️⃣ Frontend Setup
Bash

# Install dependencies
npm install

# Run the development server
npm run dev
✅ Frontend will be running at http://localhost:3000

3️⃣ Backend Setup
Create MongoDB Database
Go to MongoDB Atlas
Create a free cluster (if you haven't)
Click "Connect" → "Connect your application"
Copy the connection string (it looks like mongodb+srv://username:password@cluster...)
IMPORTANT: Go to "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (for development)
Configure Environment
Bash

cd backend

# Copy the example env file
cp .env.example .env

# Edit .env and add your MongoDB connection string
# Use your favorite editor (nano, vim, VS Code, etc.)
Update backend/.env:

env

MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/littlelearners?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
Install & Run
Bash

# Install backend dependencies
npm install

# Run the backend server
npm run dev
✅ Backend API will be running at http://localhost:5000

4️⃣ Verify Everything Works
Open two terminals:

Terminal 1 (Frontend):

Bash

npm run dev
Terminal 2 (Backend):

Bash

cd backend
npm run dev
You should see:

✅ Frontend: http://localhost:3000
✅ Backend: http://localhost:5000
✅ Connected to MongoDB Atlas in Terminal 2
🧪 Testing the API
Health Check
Bash

curl http://localhost:5000/health
Expected response:

JSON

{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
Create Test Enrollment
Bash

curl -X POST http://localhost:5000/api/v1/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "childName": "Emma Watson",
    "childAge": 6,
    "parentName": "John Watson",
    "phone": "+1234567890",
    "email": "john@example.com",
    "program": "PROGRAM_ID_HERE",
    "classMode": "online"
  }'
🎨 Design System
We use a custom design system with:

Primary Color: Curiosity Indigo (#5B4FE8)
Secondary Color: Energy Coral (#FF8A3D)
Accent Color: Sunshine Yellow (#FFC93C)
Fonts: Fredoka (headings) + Plus Jakarta Sans (body)
All design tokens are in tailwind.config.ts.

📱 Responsive Design
The site is fully responsive:

✅ Mobile (375px+)
✅ Tablet (768px+)
✅ Desktop (1024px+)
✅ Large screens (1440px+)
🚨 Common Issues & Fixes
Issue: "MongoDB connection error"
Fix:

Check your .env file has the correct connection string
Make sure you've whitelisted your IP in MongoDB Atlas:
Go to Network Access
Click Add IP Address
Choose Allow Access from Anywhere (for development)
Verify the database name is in the connection string: ...mongodb.net/littlelearners?retry...
Issue: "Port already in use"
Fix:

Bash

# Kill the process using port 3000 or 5000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
Issue: Frontend can't connect to backend
Fix:

Make sure both servers are running
Check FRONTEND_URL in backend .env matches your frontend URL
CORS should allow http://localhost:3000
🤝 Contributing
This is a collaborative project! To contribute:

Pull latest changes:

Bash

git pull origin main
Create a new branch:

Bash

git checkout -b feature/your-feature-name
Make your changes and commit:

Bash

git add .
git commit -m "Add: your feature description"
Push to GitHub:

Bash

git push origin feature/your-feature-name
Create a Pull Request on GitHub

📝 Git Workflow (For Team)
Bash

# Always pull before starting work
git pull origin main

# Create a branch for your feature
git checkout -b feature/enrollment-form

# Work on your feature...
# When done, stage and commit
git add .
git commit -m "Add enrollment form validation"

# Push your branch
git push origin feature/enrollment-form

# Create PR on GitHub
# After PR is merged, switch back to main and pull
git checkout main
git pull origin main
🔐 Environment Variables
Never commit .env files! They're in .gitignore.

When your teammate clones the repo, they should:

Copy .env.example to .env in backend folder
Fill in their own MongoDB credentials
Never push .env to GitHub
📄 License
MIT License - Feel free to use for learning!

👥 Team
Your Name - Frontend & Design
Friend's Name - Backend & Database
🎯 Roadmap
 Landing page design
 Backend API setup
 Enrollment form with validation
 Admin dashboard
 Student dashboard
 Payment integration
 Email notifications
📞 Support
For issues or questions:

Open an issue on GitHub
Contact: your-email@example.com
Made with ❤️ for curious young minds