import { useState } from 'react'
import { useAuth } from './useAuth'

interface UserData {
  userName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  userImage: File | null
}

interface UserDataFetch {
  userName: string
  email: string
  password: string
  phoneNumber: string
  userImage: string
}

interface UseRegisterFormReturn {
  userData: UserData
  imagePreview: string
  isLoading: boolean
  authError: string | null
  passwordError: string | null
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
  validatePasswords: () => boolean
}

const INITIAL_USER_DATA: UserData = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  userImage: null,
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const { login } = useAuth()

  const validatePasswords = (): boolean => {
    const isValid = userData.password === userData.confirmPassword
    setPasswordError(isValid ? null : 'Las contraseñas no coinciden')
    return isValid
  }

  const uploadImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/s3-upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error('Error al subir la imagen')
      }

      return data.url
    } catch (error) {
      console.error('Error al subir el archivo:', error)
      throw new Error('Error al procesar la imagen')
    }
  }

  const registerUser = async (formData: UserDataFetch): Promise<void> => {
    const url = process.env.NEXT_PUBLIC_URL_REGISTER
    if (!url) throw new Error('URL de registro no configurada')

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro')
    }
    return data
  }
  const handleAutoLogin = async () => {
    try {
      await login({
        usernameOrEmail: userData.userName,
        password: userData.password,
      })
    } catch (error) {
      console.error('Error en el auto-login:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUserData((prev) => ({ ...prev, userImage: file }))

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validatePasswords()) return

    setIsLoading(true)
    setAuthError(null)

    try {
      let imageUrl = ''
      if (userData.userImage) {
        imageUrl = await uploadImageToS3(userData.userImage)
      }

      const userDataToSend: UserDataFetch = {
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
        userImage: imageUrl,
      }

      await registerUser(userDataToSend)
      await handleAutoLogin()

      setUserData(INITIAL_USER_DATA)
      setImagePreview('')
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Error inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userData,
    imagePreview,
    isLoading,
    authError,
    passwordError,
    handleImageChange,
    handleSubmit,
    setUserData,
    validatePasswords,
  }
}
