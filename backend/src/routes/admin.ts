import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'

const router = express.Router()

// POST /api/v1/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    const isProduction = process.env.NODE_ENV === 'production'

    // Set TWO cookies - one for Next.js middleware, one for API auth
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.cookie('admin_logged_in', 'true', {
      httpOnly: false, // Accessible by Next.js middleware
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ message: 'Login successful', role: admin.role })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// POST /api/v1/admin/logout
router.post('/logout', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production'

  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  })
  res.clearCookie('admin_logged_in', {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  })
  res.json({ message: 'Logged out successfully' })
})

// GET /api/v1/admin/check - Check if logged in
router.get('/check', (req, res) => {
  const token = req.cookies.auth_token
  if (!token) {
    return res.status(401).json({ authenticated: false })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    res.json({ authenticated: true })
  } catch {
    res.status(401).json({ authenticated: false })
  }
})

export default router