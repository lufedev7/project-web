'use client'
import { authService } from '@/security/auth'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'
import { useEffect, useState } from 'react'

interface LoginCredentials {
  usernameOrEmail: string
  password: string
}

export const useAuth = () => {
  const { setLoginSucces } = useGlobalContext()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(authService.isAuthenticated())

      const loginSuccessStored = localStorage.getItem('loginSuccess')

      if (loginSuccessStored === 'true') {
        setLoginSucces(true)
      }

      setIsLoading(false)
    }
  }, [])

  const navigateAfterLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  const navigateAfterLogout = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null)
      setIsLoading(true)

      const response = await authService.login(credentials)

      if (response.success) {
        setIsAuthenticated(true)
        navigateAfterLogin()
        setLoginSucces(true)

        localStorage.setItem('loginSuccess', 'true')
        localStorage.setItem('nameUser', response.loginUser?.userName || '')
        localStorage.setItem('idUser', response.loginUser?.id.toString() || '')
        localStorage.setItem('imageUser', response.loginUser?.userImage || '')
        localStorage.setItem('emailUser', response.loginUser?.email || '')
      } else {
        setError(response.message || 'Error de autenticación')
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error en login:', error)
      setError('Error al intentar iniciar sesión')
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authService.removeAuthHeader()
    setIsAuthenticated(false)
    setError(null)
    navigateAfterLogout()

    localStorage.setItem('loginSuccess', 'false')
    localStorage.removeItem('nameUser')
    localStorage.removeItem('idUser')
    localStorage.removeItem('imageUser')
    localStorage.removeItem('emailUser')
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  }
}
