import { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [ mousePosition, storeMousePosition ] = useState({ x: 0, y: 0 })

  const updateCoords = e => {
    storeMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateCoords)
    return () => window.removeEventListener('mousemove', updateCoords)
  }, [])

  return mousePosition
}

export default useMousePosition
