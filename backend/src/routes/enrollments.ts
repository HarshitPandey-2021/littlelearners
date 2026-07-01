import express from 'express'
import Enrollment from '../models/Enrollment'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()




// Validation helper
const validateEnrollment = (data: any) => {
  const errors: string[] = []

  if (!data.studentName || data.studentName.trim().length < 2) {
    errors.push('Student name must be at least 2 characters')
  }
  if (!data.parentName || data.parentName.trim().length < 2) {
    errors.push('Parent name must be at least 2 characters')
  }
  if (!data.childAge || data.childAge < 5 || data.childAge > 10) {
    errors.push('Child age must be between 5 and 10')
  }
  if (!data.parentMobile || !/^\+?[\d\s-]{10,}$/.test(data.parentMobile)) {
    errors.push('Invalid phone number')
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email address')
  }
  if (!data.city || data.city.trim().length < 2) {
    errors.push('City is required')
  }
  if (!data.howDidYouHear) {
    errors.push('Please tell us how you found us')
  }
  if (!data.agreedToReceiveInfo) {
    errors.push('You must agree to receive course information')
  }

  return errors
}



// POST /api/v1/enrollments - Create new enrollment (public)
router.post('/', async (req, res) => {
  try {
    // Validate input
    const errors = validateEnrollment(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') })
    }

    // Sanitize data (trim strings, prevent injection)
    const sanitizedData = {
      ...req.body,
      studentName: req.body.studentName.trim(),
      parentName: req.body.parentName.trim(),
      parentMobile: req.body.parentMobile.trim(),
      whatsappNumber: req.body.whatsappNumber.trim(),
      email: req.body.email.trim().toLowerCase(),
      city: req.body.city.trim(),
      additionalNotes: req.body.additionalNotes?.trim() || '',
    }

    const enrollment = new Enrollment(sanitizedData)
    await enrollment.save()

    res.status(201).json({ 
      message: 'Enrollment submitted successfully',
      enrollmentId: enrollment._id 
    })
  } catch (error: any) {
    console.error('Enrollment error:', error)
    
    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(400).json({ error: 'This email is already registered' })
    }
    
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

// PATCH /api/v1/enrollments/:id - Update enrollment
router.patch('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' } // Changed from { new: true }
    )
    res.json(enrollment)
  } catch (error) {
    console.error('Update error:', error)
    res.status(400).json({ error: 'Failed to update enrollment' })
  }
})


// DELETE /api/v1/enrollments/:id - Delete enrollment
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json({ message: 'Enrollment deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: 'Failed to delete enrollment' })
  }
})

export default router