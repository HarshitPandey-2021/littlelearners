import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import enrollmentRoutes from './routes/enrollments'
import programRoutes from './routes/programs'
import adminRoutes from './routes/admin'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/v1/enrollments', enrollmentRoutes)
app.use('/api/v1/programs', programRoutes)
app.use('/api/v1/admin', adminRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  })

export default app