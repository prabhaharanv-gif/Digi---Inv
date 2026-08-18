/**
 * mediaStore.js — Shared in-memory + IndexedDB media store
 *
 * Why not sessionStorage / localStorage?
 *   • sessionStorage: 5 MB limit — a 10 MB video becomes ~13 MB as base64 → quota exceeded on mobile
 *   • localStorage:   same size limit, plus persists forever (not ideal for temp uploads)
 *   • base64 objectURL: objectURLs get revoked on component unmount; base64 of video is huge
 *
 * Why IndexedDB?
 *   • Stores raw Blob/File objects — no size inflation
 *   • 50–500 MB quota depending on device storage (plenty for a wedding video)
 *   • Works on Safari iOS 15+, Chrome Android, all modern mobile browsers
 *   • Async but simple for our use case
 *
 * Pattern:
 *   1. Upload in Dashboard → store Blob in IndexedDB + create objectURL for current tab
 *   2. On invite load → read Blob from IndexedDB → create fresh objectURL
 *   3. On component unmount → revoke objectURL to free memory
 */

const DB_NAME    = 'weddingInviteMedia'
const DB_VERSION = 1
const STORE_NAME = 'media'

/* ── Open / create the DB ──────────────────────────────────────────────── */
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore(STORE_NAME)
    }
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror   = (e) => reject(e.target.error)
  })
}

/* ── Write a Blob under a key ──────────────────────────────────────────── */
export async function saveBlob(key, blob) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req   = store.put(blob, key)
      req.onsuccess = () => resolve(true)
      req.onerror   = (e) => reject(e.target.error)
    })
  } catch (e) {
    console.warn('mediaStore.saveBlob failed:', e)
    return false
  }
}

/* ── Read a Blob and return a fresh objectURL ──────────────────────────── */
export async function loadBlobUrl(key) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req   = store.get(key)
      req.onsuccess = (e) => {
        const blob = e.target.result
        if (!blob) { resolve(null); return }
        resolve(URL.createObjectURL(blob))
      }
      req.onerror = (e) => reject(e.target.error)
    })
  } catch (e) {
    console.warn('mediaStore.loadBlobUrl failed:', e)
    return null
  }
}

/* ── Delete a stored Blob ──────────────────────────────────────────────── */
export async function deleteBlob(key) {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx    = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.delete(key)
      tx.oncomplete = () => resolve(true)
    })
  } catch (e) {
    console.warn('mediaStore.deleteBlob failed:', e)
    return false
  }
}

/* ── Check if a key exists ─────────────────────────────────────────────── */
export async function hasBlob(key) {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx    = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req   = store.count(key)
      req.onsuccess = (e) => resolve(e.target.result > 0)
      req.onerror   = () => resolve(false)
    })
  } catch {
    return false
  }
}

/* ── Small metadata store in localStorage (just keys + names, no blobs) ── */
const META_KEY = 'weddingMediaMeta'

export function getMeta() {
  try { return JSON.parse(localStorage.getItem(META_KEY) || '{}') } catch { return {} }
}

export function saveMeta(updates) {
  try {
    const next = { ...getMeta(), ...updates }
    localStorage.setItem(META_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('weddingMediaUpdate'))
    return next
  } catch { return {} }
}

export function clearMeta(keys) {
  try {
    const meta = getMeta()
    keys.forEach(k => delete meta[k])
    localStorage.setItem(META_KEY, JSON.stringify(meta))
    window.dispatchEvent(new Event('weddingMediaUpdate'))
  } catch {}
}
