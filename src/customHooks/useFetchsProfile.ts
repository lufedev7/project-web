import { useEffect, useRef, useState } from 'react'
import { fetchWithAuth, authService, LoginCredentials } from '../security/auth' // Ajusta la ruta de importación según tu estructura

export interface DataUserType {
  id: number
  userName: string
  email: string
  phoneNumber: string
  userImage: string
  seller: boolean
}
export interface DataProductsUser {
  message: string
  data: Data
  success: boolean
}

export interface Data {
  content: Content[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface Content {
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
export interface MyTransactionsType {
  message: string
  data: Data
  success: boolean
}

export interface Data {
  userResponseDTO: UserResponseDTO
  buyerTransactions: any[]
  buyerTransactionsPageNo: number
  buyerTransactionsPageSize: number
  buyerTransactionsTotalElements: number
  buyerTransactionsTotalPages: number
  buyerTransactionsLast: boolean
  sellerTransactions: any[]
  sellerTransactionsPageNo: number
  sellerTransactionsPageSize: number
  sellerTransactionsTotalElements: number
  sellerTransactionsTotalPages: number
  sellerTransactionsLast: boolean
}

export interface UserResponseDTO {
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
  const [dataProductUser, setDataProductUser] = useState<DataProductsUser>()
  const [dataTransactions, setDataTransactions] = useState<MyTransactionsType>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true
      void fetchProfile()
      void fetchMyProducts()
      void fetchMytransactions()
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
  async function fetchMyProducts() {
    const url = process.env.NEXT_PUBLIC_URL_MY_PRODUCTS

    if (!url) {
      setError('URL no configurada')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetchWithAuth(url, {
        method: 'GET',
      })
      setDataProductUser(response)
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
  async function fetchMytransactions() {
    const url = process.env.NEXT_PUBLIC_URL_MY_TRANSACTIONS

    if (!url) {
      setError('URL no configurada')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetchWithAuth(url, {
        method: 'GET',
      })
      setDataTransactions(response)
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
  async function updateUser(idUser: number, newDataUser: DataUserType) {
    const url = process.env.NEXT_PUBLIC_URL_UPDATE_USER + idUser.toString()

    if (!url) {
      setError('URL no configurada')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify(newDataUser),
      })
      setDataProductUser(response)
      const credentials = authService.getAuthHeader()
      const credentialsLogin = authService.parseBasicAuthHeader(credentials)
      if (credentialsLogin?.password) {
        const newCredentials: LoginCredentials = {
          usernameOrEmail: newDataUser.userName,
          password: credentialsLogin.password,
        }
        console.log(newCredentials)
        const newCredentialEncrip =
          authService.createBasicAuthHeader(newCredentials)
        authService.setAuthHeader(newCredentialEncrip)
      }
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
    dataProductUser,
    dataTransactions,
    error,
    isLoading,
    refetch: fetchProfile,
    updateUser,
  }
}
