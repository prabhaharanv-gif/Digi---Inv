const express = require('express')
const router  = express.Router()
const db      = require('../db/mockDb')

// GET /api/guests?eventId=evt-001
router.get('/', (req, res) => {
  const { eventId = 'evt-001' } = req.query
  const guests = db.getAllGuests(eventId)
  res.json(guests)
})

// POST /api/guests — add a guest
router.post('/', (req, res) => {
  const { name, relation, eventId = 'evt-001' } = req.body
  if (!name) return res.status(400).json({ error: 'name is required' })
  const guest = db.addGuest({ name, relation, eventId })
  const link = `${req.protocol}://${req.get('host').replace('3001','5173')}/i/${guest.token}`
  console.log(`👤 Added: ${name} → ${link}`)
  res.status(201).json({ ...guest, inviteLink: link })
})

// DELETE /api/guests/:id
router.delete('/:id', (req, res) => {
  db.deleteGuest(req.params.id)
  res.json({ success: true })
})

module.exports = router
