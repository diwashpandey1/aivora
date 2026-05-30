import { useEffect, useState } from 'react'

export const usePlaceholderRotation = (items, delay = 2600) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!items.length) return undefined

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, delay)

    return () => window.clearInterval(interval)
  }, [delay, items.length])

  return items[index]
}
