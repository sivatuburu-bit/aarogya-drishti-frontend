import { useEffect, useState } from 'react'

export default function useCountUp(target, ms = 900) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(target)
    let raf, t0
    const tick = (t) => {
      t0 ??= t
      const p = Math.min((t - t0) / ms, 1)
      setV(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return v
}
