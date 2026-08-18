/**
 * server/routes/media.js
 * 
 * POST /api/media/upload   — upload video or music file (multipart/form-data)
 * GET  /api/media/config   — get current media URLs
 * DELETE /api/media/:type  — remove a file (type = 'video' | 'music')
 * GET  /api/media/file/:type — stream the actual file
 */

const express  = require('express')
const multer   = require('multer')
const path     = require('path')
const fs       = require('fs')
const router   = express.Router()

// ── Storage directory (persists on Railway's ephemeral disk) ────────────────
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

// ── In-memory config (resets on server restart — see note below) ────────────
// For permanent storage across Railway restarts, use a DB or Railway Volume.
// For a wedding invite that runs for a few weeks, this is fine — just re-upload
// once after a server restart if needed.
let mediaConfig = {
  videoUrl:  null,
  videoName: null,
  musicUrl:  null,
  musicName: null,
}

// ── Multer disk storage ─────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // Use fixed names so we always overwrite: video.mp4, music.mp3 etc.
    const type = req.body?.type || req.query?.type || 'file'
    const ext  = path.extname(file.originalname) || (file.mimetype.includes('video') ? '.mp4' : '.mp3')
    cb(null, `${type}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['video/', 'audio/']
    if (allowed.some(t => file.mimetype.startsWith(t))) cb(null, true)
    else cb(new Error('Only video and audio files are allowed'))
  },
})

// ── Helper: build public URL for a stored file ──────────────────────────────
function fileUrl(req, type, filename) {
  const base = process.env.SERVER_URL ||
    `${req.protocol}://${req.get('host')}`
  return `${base}/api/media/file/${type}/${encodeURIComponent(filename)}`
}

// ── POST /api/media/upload ──────────────────────────────────────────────────
router.post('/upload', (req, res) => {
  // We use multer as middleware manually so we can read type from the form field
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err)
      return res.status(400).json({ error: err.message })
    }
    if (!req.file) return res.status(400).json({ error: 'No file received' })

    const type = req.body?.type // 'video' | 'music'
    if (!type || !['video','music'].includes(type)) {
      return res.status(400).json({ error: 'type must be "video" or "music"' })
    }

    const url  = fileUrl(req, type, req.file.filename)
    const name = req.file.originalname

    if (type === 'video') {
      mediaConfig.videoUrl  = url
      mediaConfig.videoName = name
    } else {
      mediaConfig.musicUrl  = url
      mediaConfig.musicName = name
    }

    console.log(`✅ ${type} uploaded: ${req.file.filename} (${Math.round(req.file.size/1024)}KB)`)
    res.json({ success: true, url, name, type })
  })
})

// ── GET /api/media/config ───────────────────────────────────────────────────
router.get('/config', (req, res) => {
  res.json(mediaConfig)
})

// ── DELETE /api/media/:type ─────────────────────────────────────────────────
router.delete('/:type', (req, res) => {
  const { type } = req.params
  if (!['video','music'].includes(type)) {
    return res.status(400).json({ error: 'type must be video or music' })
  }

  // Find and delete the file
  const files = fs.readdirSync(UPLOAD_DIR).filter(f => f.startsWith(type))
  files.forEach(f => {
    try { fs.unlinkSync(path.join(UPLOAD_DIR, f)) } catch {}
  })

  if (type === 'video') { mediaConfig.videoUrl = null; mediaConfig.videoName = null }
  else                  { mediaConfig.musicUrl = null; mediaConfig.musicName = null }

  res.json({ success: true })
})

// ── GET /api/media/file/:type/:filename — stream the file ──────────────────
router.get('/file/:type/:filename', (req, res) => {
  const filename = decodeURIComponent(req.params.filename)
  const filePath = path.join(UPLOAD_DIR, filename)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }

  const stat = fs.statSync(filePath)
  const fileSize = stat.size
  const range    = req.headers.range

  // Support HTTP Range requests so mobile Safari can stream video
  if (range) {
    const parts  = range.replace(/bytes=/, '').split('-')
    const start  = parseInt(parts[0], 10)
    const end    = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
    const chunkSize = end - start + 1

    const ext = path.extname(filename).toLowerCase()
    const mimeMap = {
      '.mp4':'video/mp4', '.webm':'video/webm', '.ogg':'video/ogg',
      '.mp3':'audio/mpeg', '.wav':'audio/wav', '.m4a':'audio/mp4',
    }
    const contentType = mimeMap[ext] || 'application/octet-stream'

    res.writeHead(206, {
      'Content-Range':  `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges':  'bytes',
      'Content-Length': chunkSize,
      'Content-Type':   contentType,
    })

    fs.createReadStream(filePath, { start, end }).pipe(res)
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type':   'application/octet-stream',
      'Accept-Ranges':  'bytes',
    })
    fs.createReadStream(filePath).pipe(res)
  }
})

module.exports = router
