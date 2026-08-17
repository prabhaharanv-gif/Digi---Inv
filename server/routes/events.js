const express = require('express')
const router  = express.Router()
const db      = require('../db/mockDb')

// GET /api/events/:id
router.get('/:id', (req, res) => {
  const event = db.getEvent(req.params.id)
  if (!event) return res.status(404).json({ error: 'Event not found' })
  res.json(event)
})

// GET /api/events
router.get('/', (req, res) => {
  res.json([db.EVENT])
})

module.exports = router
