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
export interface ImageType {
  productId: number
  url: string
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
export interface Products {
  productName: string
  categoryId: number
  productDescription: string
  userId: number | undefined
  originalPrice: number
  salePrice: number
  stockQuantity: number
  imageUrl: string
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
  const [dataProductUser, setDataProductUser] =
    useState<DataProductsUser | null>()
  const [dataTransactions, setDataTransactions] = useState<MyTransactionsType>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [productError, setProductError] = useState<{
    message?: string
    details?: string
  }>()
  const [isSellerError, setIsSellerError] = useState(false)
  const [test, setTest] = useState<string>()

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

      if (response && response.timeStamp) {
        console.warn('Error al obtener productos:', response.messague)

        setIsSellerError(true)
        setDataProductUser(null)
      } else {
        // Respuesta exitosa
        setDataProductUser(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Error al obtener los productos')
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

  async function postProducts(DataProducts: Products) {
    const url = process.env.NEXT_PUBLIC_URL_POST_PRODUCTS
    const urlImage = process.env.NEXT_PUBLIC_URL_POST_IMAGE

    setProductError(undefined)

    if (!url) {
      setError('URL no configurada')
      return null
    }
    if (!urlImage) {
      setError('URL no configurada')
      return null
    }

    try {
      setIsLoading(true)

      const productResponse = await fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify(DataProducts),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (
        productResponse &&
        typeof productResponse === 'object' &&
        'timeStamp' in productResponse
      ) {
        // Handle server-side validation errors
        setProductError({
          message: productResponse.messague || 'Error al crear el producto',
          details: productResponse.details,
        })
        return null
      }

      console.log('Raw product response:', productResponse)

      let productData
      if (typeof productResponse === 'object' && productResponse !== null) {
        if (
          'json' in productResponse &&
          typeof productResponse.json === 'function'
        ) {
          productData = await productResponse.json()
        } else {
          productData = productResponse
        }
      } else {
        try {
          productData = JSON.parse(productResponse.toString())
        } catch (parseError) {
          console.error('Failed to parse product response:', parseError)
          throw new Error('Invalid response format')
        }
      }

      console.log('Parsed Product Data:', productData)

      const productId =
        productData.productId ||
        productData.data?.productId ||
        productData.id ||
        productData.product?.id

      if (!productId) {
        console.error('No product ID found in response:', productData)
        throw new Error('No product ID found in response')
      }

      const imageData: ImageType = {
        productId: productId,
        url: DataProducts.imageUrl,
      }

      const imageResponse = await fetchWithAuth(urlImage, {
        method: 'POST',
        body: JSON.stringify(imageData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      let imageResponseData
      if (
        typeof imageResponse === 'object' &&
        imageResponse !== null &&
        'json' in imageResponse
      ) {
        imageResponseData = await imageResponse.json()
        console.log('Image upload response:', imageResponseData)
      } else {
        console.log('Image response was not a JSON response:', imageResponse)
      }

      return productData
    } catch (error) {
      console.error('Error in postProducts:', error)

      if (error instanceof Error) {
        setProductError({
          message: error.message,
          details: 'Error durante la creación del producto',
        })
      } else {
        setProductError({
          message: 'Error al crear el producto',
          details: 'Ocurrió un error inesperado',
        })
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }
  return {
    dataFetch,
    dataProductUser,
    dataTransactions,
    error,
    productError,
    isLoading,
    refetch: fetchProfile,
    updateUser,
    postProducts,
    test,
    isSellerError,
  }
}
