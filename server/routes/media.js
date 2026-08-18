const express  = require('express')
const multer   = require('multer')
const path     = require('path')
const fs       = require('fs')
const router   = express.Router()

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

let mediaConfig = { videoUrl:null, videoName:null, musicUrl:null, musicName:null }

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // type comes from query string (?type=video) OR multipart body field
    const type = req.query.type || req.body?.type || 'file'
    const ext  = path.extname(file.originalname) || (file.mimetype.includes('video') ? '.mp4' : '.mp3')
    cb(null, `${type}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (['video/','audio/'].some(t => file.mimetype.startsWith(t))) cb(null, true)
    else cb(new Error('Only video and audio files are allowed'))
  },
})

function fileUrl(req, type, filename) {
  const base = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`
  return `${base}/api/media/file/${type}/${encodeURIComponent(filename)}`
}

router.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message)
      return res.status(400).json({ error: err.message })
    }
    if (!req.file) return res.status(400).json({ error: 'No file received' })

    // Accept type from query string (?type=video) OR multipart body field
    const type = req.query.type || req.body?.type
    if (!type || !['video','music'].includes(type)) {
      return res.status(400).json({ error: 'type must be "video" or "music" (send as query param or form field)' })
    }

    const url  = fileUrl(req, type, req.file.filename)
    const name = req.file.originalname

    if (type === 'video') { mediaConfig.videoUrl = url; mediaConfig.videoName = name }
    else                  { mediaConfig.musicUrl = url; mediaConfig.musicName = name }

    console.log(`✅ Uploaded ${type}: ${req.file.filename} (${Math.round(req.file.size/1024)}KB)`)
    res.json({ success:true, url, name, type })
  })
})

router.get('/config', (req, res) => res.json(mediaConfig))

router.delete('/:type', (req, res) => {
  const { type } = req.params
  if (!['video','music'].includes(type)) return res.status(400).json({ error: 'invalid type' })
  fs.readdirSync(UPLOAD_DIR).filter(f => f.startsWith(type))
    .forEach(f => { try { fs.unlinkSync(path.join(UPLOAD_DIR, f)) } catch {} })
  if (type === 'video') { mediaConfig.videoUrl = null; mediaConfig.videoName = null }
  else                  { mediaConfig.musicUrl = null; mediaConfig.musicName = null }
  res.json({ success: true })
})

router.get('/file/:type/:filename', (req, res) => {
  const filename = decodeURIComponent(req.params.filename)
  const filePath = path.join(UPLOAD_DIR, filename)
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' })
  const stat     = fs.statSync(filePath)
  const fileSize = stat.size
  const range    = req.headers.range
  const ext      = path.extname(filename).toLowerCase()
  const mimeMap  = { '.mp4':'video/mp4','.webm':'video/webm','.ogg':'video/ogg','.mp3':'audio/mpeg','.wav':'audio/wav','.m4a':'audio/mp4' }
  const mime     = mimeMap[ext] || 'application/octet-stream'
  if (range) {
    const [s, e] = range.replace(/bytes=/, '').split('-')
    const start  = parseInt(s, 10)
    const end    = e ? parseInt(e, 10) : fileSize - 1
    res.writeHead(206, { 'Content-Range':`bytes ${start}-${end}/${fileSize}`, 'Accept-Ranges':'bytes', 'Content-Length':end-start+1, 'Content-Type':mime })
    fs.createReadStream(filePath, { start, end }).pipe(res)
  } else {
    res.writeHead(200, { 'Content-Length':fileSize, 'Content-Type':mime, 'Accept-Ranges':'bytes' })
    fs.createReadStream(filePath).pipe(res)
  }
})

module.exports = router
