require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const app = express()

// Allow any localhost port (dev) + production CLIENT_URL
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin)
    const isProd      = origin === process.env.CLIENT_URL
    if (isLocalhost || isProd) return cb(null, true)
    cb(new Error(`CORS: ${origin} not allowed`))
  },
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/invite',    require('./routes/invite'))
app.use('/api/rsvp',      require('./routes/rsvp'))
app.use('/api/guests',    require('./routes/guests'))
app.use('/api/events',    require('./routes/events'))
app.use('/api/dashboard', require('./routes/dashboard'))
app.use('/api/media',     require('./routes/media'))

app.get('/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\n??  Invite server running on http://localhost:${PORT}`)
  console.log(`    Upload endpoint: POST /api/media/upload`)
  console.log(`    Media config:    GET  /api/media/config\n`)
})
