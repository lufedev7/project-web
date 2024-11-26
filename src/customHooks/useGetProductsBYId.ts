export interface ProductsTypes {
  productId: number
  productName: string
  categoryId: number
  categoryName: string
  productDescription: string
  isNew: boolean
  userId: number
  userName: string
  originalPrice: number
  salePrice: number
  isSold: boolean
  imageUrls: string[]
  stockQuantity: number
}

import { useEffect, useRef, useState } from 'react'

export default function useGetProductsById(producId: string) {
  const fetchedRef = useRef(false)
  const [dataFetch, setDataFetch] = useState<ProductsTypes>()
  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true
      void Fetching()
    }
  }, [])

  async function Fetching() {
    const url = process.env.NEXT_PUBLIC_URL_PRODUCTS_BY_ID + producId
    console.log(url)
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
          setDataFetch(undefined)
        },
      )
  }
  return { dataFetch }
}
