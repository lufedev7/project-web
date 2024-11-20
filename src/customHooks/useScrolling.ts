import { useState, useCallback, useEffect } from 'react'

function useScrolling() {
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolling(window.scrollY >= window.innerHeight - 600)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return isScrolling
}

export default useScrolling
