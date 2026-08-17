import { useState, useEffect } from 'react'

export function useCountdown(targetISO) {
  const [time, setTime] = useState({ days: '--', hours: '--', mins: '--', secs: '--' })

  useEffect(() => {
    function calc() {
      const diff = new Date(targetISO) - new Date()
      if (diff <= 0) {
        setTime({ days: '00', hours: '00', mins: '00', secs: '00' })
        return
      }
      const pad = (n) => String(Math.floor(n)).padStart(2, '0')
      setTime({
        days:  pad(diff / (1000 * 60 * 60 * 24)),
        hours: pad((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins:  pad((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs:  pad((diff % (1000 * 60)) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetISO])

  return time
}
