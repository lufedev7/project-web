import { useState, useLayoutEffect } from 'react'

const useWindowWidth = () => {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}

export default useWindowWidth
