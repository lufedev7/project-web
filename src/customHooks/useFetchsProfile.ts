import { useEffect, useRef, useState } from 'react'
import { fetchWithAuth } from '../security/auth' // Ajusta la ruta de importación según tu estructura

export interface DataUserType {
  id: number
  userName: string
  email: string
  phoneNumber: string
  userImage: string
  seller: boolean
}

export default function useFetchProfile() {
  const fetchedRef = useRef(false)
  const [dataFetch, setDataFetch] = useState<DataUserType>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true
      void fetchProfile()
    }
  }, [])

  async function fetchProfile() {
    const url = process.env.NEXT_PUBLIC_URL_MY_PROFILE

    if (!url) {
      setError('URL no configurada')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetchWithAuth(url, {
        method: 'GET',
      })
      setDataFetch(response)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Error al obtener el perfil')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    dataFetch,
    error,
    isLoading,
    refetch: fetchProfile,
  }
}
