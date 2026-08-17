require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/invite',    require('./routes/invite'))
app.use('/api/rsvp',      require('./routes/rsvp'))
app.use('/api/guests',    require('./routes/guests'))
app.use('/api/events',    require('./routes/events'))
app.use('/api/dashboard', require('./routes/dashboard'))

app.get('/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\n🪔  Invite server running on http://localhost:${PORT}`)
  console.log(`    Guest invite: http://localhost:5173/i/anbu`)
  console.log(`    Dashboard:    http://localhost:5173/dashboard\n`)
})
