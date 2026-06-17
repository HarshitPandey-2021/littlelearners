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

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.json({ message: 'Login successful', role: admin.role })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router