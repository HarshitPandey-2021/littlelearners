import express from 'express'
import Enrollment from '../models/Enrollment'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// POST /api/v1/enrollments - Create new enrollment (public)
router.post('/', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body)
    await enrollment.save()
    res.status(201).json({ 
      message: 'Enrollment submitted successfully',
      enrollmentId: enrollment._id 
    })
  } catch (error) {
    res.status(400).json({ error: 'Invalid enrollment data' })
  }
})

// GET /api/v1/enrollments - List enrollments (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query
    
    const query: any = {}
    if (status) query.status = status
    if (search) {
      query.$or = [
        { childName: new RegExp(search as string, 'i') },
        { parentName: new RegExp(search as string, 'i') },
        { email: new RegExp(search as string, 'i') },
      ]
    }

    const enrollments = await Enrollment.find(query)
      .populate('program')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Enrollment.countDocuments(query)

    res.json({ enrollments, total, page: Number(page), limit: Number(limit) })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enrollments' })
  }
})

// PATCH /api/v1/enrollments/:id - Update enrollment status (admin only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(enrollment)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update enrollment' })
  }
})

export default router