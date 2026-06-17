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
    console.error('Enrollment error:', error)
    res.status(400).json({ error: 'Invalid enrollment data' })
  }
})

// GET /api/v1/enrollments/stats - Get stats (TEMPORARILY NO AUTH)
router.get('/stats', async (req, res) => {
  try {
    const total = await Enrollment.countDocuments()
    const statusCounts = await Enrollment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ])

    const stats = {
      total,
      new: statusCounts.find((s: any) => s._id === 'new')?.count || 0,
      contacted: statusCounts.find((s: any) => s._id === 'contacted')?.count || 0,
      enrolled: statusCounts.find((s: any) => s._id === 'enrolled')?.count || 0,
    }

    res.json(stats)
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// GET /api/v1/enrollments - List enrollments (TEMPORARILY NO AUTH)
router.get('/', async (req, res) => {
  try {
    const { status, search, page = 1, limit = 100 } = req.query
    
    const query: any = {}
    if (status) query.status = status
    if (search) {
      query.$or = [
        { studentName: new RegExp(search as string, 'i') },
        { parentName: new RegExp(search as string, 'i') },
        { email: new RegExp(search as string, 'i') },
      ]
    }

    const enrollments = await Enrollment.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Enrollment.countDocuments(query)

    res.json({ enrollments, total, page: Number(page), limit: Number(limit) })
  } catch (error) {
    console.error('Fetch enrollments error:', error)
    res.status(500).json({ error: 'Failed to fetch enrollments' })
  }
})

// PATCH /api/v1/enrollments/:id - Update enrollment status (TEMPORARILY NO AUTH)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(enrollment)
  } catch (error) {
    console.error('Update error:', error)
    res.status(400).json({ error: 'Failed to update enrollment' })
  }
})

export default router