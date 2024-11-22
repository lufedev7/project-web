interface LoginCredentials {
  usernameOrEmail: string
  password: string
}
interface LoginResponse {
  success: boolean
  message?: string
  loginUser?: LoginUserType
}
export interface LoginUserType {
  id: number
  userName: string
  email: string
  phoneNumber: string
  userImage: string
  seller: boolean
}

const url = process.env.NEXT_PUBLIC_URL_LOGIN || ''
export const authService = {
  createBasicAuthHeader(credentials: LoginCredentials): string {
    const base64Credentials = btoa(
      `${credentials.usernameOrEmail}:${credentials.password}`,
    )
    return `Basic ${base64Credentials}`
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const basicAuth = this.createBasicAuthHeader(credentials)
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',

        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        switch (response.status) {
          case 401:
            return {
              success: false,
              message: 'Usuario o contraseña incorrectos',
            }
          case 403:
            return {
              success: false,
              message: 'Acceso denegado',
            }
          case 500:
            return {
              success: false,
              message: 'Usuario o contraseña incorrectos',
            }
          default:
            return {
              success: false,
              message: `Error de autenticación: ${response.status}`,
            }
        }
      }
      const userData = await response.json()

      this.setAuthHeader(basicAuth)
      console.log(userData)
      return { success: true, loginUser: userData }
    } catch (error) {
      console.error('Error en authService.login:', error)
      return {
        success: false,
        message: 'Error de conexión al servidor',
      }
    }
  },

  setAuthHeader(basicAuth: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('basicAuth', basicAuth)
    }
  },

  getAuthHeader() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('basicAuth')
    }
    return null
  },

  removeAuthHeader() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('basicAuth')
    }
  },

  isAuthenticated() {
    return !!this.getAuthHeader()
  },
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const basicAuth = authService.getAuthHeader()

  if (!basicAuth) {
    throw new Error('No hay credenciales de autenticación')
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: basicAuth,
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error en fetchWithAuth:', error)
    throw error
  }
}
