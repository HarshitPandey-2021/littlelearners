import express from 'express'
import Program from '../models/Program'

const router = express.Router()

// GET /api/v1/programs - Get all active programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true })
    res.json(programs)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch programs' })
  }
})

export default router