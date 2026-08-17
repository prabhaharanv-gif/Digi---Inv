import { useEffect, useRef } from 'react'

export function useSwipe({ onNext, onPrev, threshold = 50 }) {
  const touchStart = useRef(null)
  const touchStartY = useRef(null)

  useEffect(() => {
    const onTouchStart = (e) => {
      touchStart.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e) => {
      if (touchStart.current === null) return
      const dx = e.changedTouches[0].clientX - touchStart.current
      const dy = e.changedTouches[0].clientY - touchStartY.current
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx < 0) onNext()
        else onPrev()
      }
      touchStart.current = null
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [onNext, onPrev, threshold])
}
