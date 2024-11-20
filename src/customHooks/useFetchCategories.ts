import { type Categories } from '@/components/floatCategories/CategoriesTypes.type'
import { useEffect, useRef, useState } from 'react'

export default function useFetchCategories() {
  const fetchedRef = useRef(false)
  const [dataFetch, setDataFetch] = useState<Categories[]>([])
  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true
      void Fetching()
    }
  }, [])

  async function Fetching() {
    const url = process.env.NEXT_PUBLIC_URL_CATEGORIES
    if (!url) {
      throw new Error('URL is not defined')
    }
    fetch(url)
      .then(async (res) => {
        if (res.status >= 400) {
          throw new Error('Server response with error!')
        }
        return await res.json()
      })
      .then(
        (data) => {
          setDataFetch(data)
        },
        (err) => {
          console.error('error en el hook', err)
          setDataFetch([])
        },
      )
  }
  return { dataFetch }
}
