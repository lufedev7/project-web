import { useCallback, useRef, useState } from 'react'
import { searchMarket } from '@/services/getFetchSearch'

export function useSearchMarket(Search: string) {
  const [responseSearch, setResponseSearch] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(true)
  const previousSearch = useRef(Search)
  const getSearch = useCallback(async (Search: string) => {
    if (Search === previousSearch.current) return
    try {
      setLoading(true)
      setError(false)
      previousSearch.current = Search
      const newSearch = await searchMarket(Search)
      // console.log(newSearch)
      setResponseSearch(newSearch as [])
    } catch (e) {
      setError(false)
    } finally {
      setLoading(false)
    }
  }, [])
  return { responseSearch, getSearch, loading }
}
