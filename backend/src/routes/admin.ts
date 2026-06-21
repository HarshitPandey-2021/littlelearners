import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'
import { authMiddleware } from '../middleware/auth'


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

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
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
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
  res.json({ message: 'Logged out successfully' })
})

// GET /api/v1/admin/check
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


//add this route
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const adminId = (req as any).user.id

    const admin = await Admin.findById(adminId)
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' })
    }

    const isValid = await bcrypt.compare(currentPassword, admin.passwordHash)
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    const newHash = await bcrypt.hash(newPassword, 10)
    admin.passwordHash = newHash
    await admin.save()

    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ error: 'Failed to update password' })
  }
})


// router.get('/ping-test', (req, res) => {
//   res.json({ pong: true })
// })


export default router