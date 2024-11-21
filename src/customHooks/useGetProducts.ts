import { initialState, reducer } from '@/reducer/FetchProductsReducer'
import { useEffect, useReducer, useRef } from 'react'

export default function useGetProducts() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const fetchRef = useRef(false)

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true
      void Fetching()
      console.log('feching')
    }
  }, [])
  async function getMoreFetching() {
    void Fetching()
  }
  async function Fetching() {
    state.count = state.count + 1
    const url =
      process.env.NEXT_PUBLIC_URL_PRODUCTS +
      'pageNo=' +
      state.count.toString() +
      '&pageSize=12&sortBy=productId'
    try {
      const res = await fetch(url)
      if (res.status >= 400) {
        throw new Error('server response with error')
      }
      const data = await res.json()

      dispatch({ type: 'FETCH_SUCCESS', data })
    } catch (error) {
      console.error('error response', error)
      dispatch({ type: 'FETCH_ERROR', error })
    }
  }
  return {
    response: state.requesFechsConcat,
    loader: state.loader,
    getMoreFetching,
    isLatest: state.isLatest,
    batRequest: state.batRequest,
  }
}
