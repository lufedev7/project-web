import { useEffect, useState } from 'react'

export default function useImagesCarrucel(imagesUrl: string[]) {
  const [currentImagesIndex, setCurrentImagesIndex] = useState<number>(0)
  const DEFAULT_IMAGE_URL = '/assets/backgroundNoImage.webp'
  const [isTransitionImg, setIsTransitionImg] = useState<boolean>(false)
  useEffect(() => {
    if (imagesUrl.length === 0) return
    const interval = setInterval(() => {
      setIsTransitionImg(true)
      setTimeout(() => {
        setCurrentImagesIndex((prevIndex) => (prevIndex + 1) % imagesUrl.length)
        setIsTransitionImg(false)
      }, 700)
    }, 15000)
    return () => {
      clearInterval(interval)
    }
  }, [imagesUrl.length])
  const currentImageUrl =
    imagesUrl.length > 0
      ? imagesUrl[currentImagesIndex] || DEFAULT_IMAGE_URL
      : DEFAULT_IMAGE_URL
  return { currentImageUrl, isTransitionImg, currentImagesIndex }
}
