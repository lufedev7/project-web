interface UserDataType {
  userName: string
  email: string
  password: string
  phoneNumber: string
  userImage: string
}
interface LoginResponse {
  success: boolean
  message?: string
  loginUser?: LoginUserResponseType
}
export interface LoginUserResponseType {
  id: number
  userName: string
  email: string
  phoneNumber: string
  userImage: string
  seller: boolean
}

const url = process.env.NEXT_PUBLIC_URL_REGISTER || ''
export const registerService = {
  async login(userData: UserDataType): Promise<LoginResponse> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',

        body: JSON.stringify(userData),
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
      const userDataResponse = await response.json()

      console.log(userData)
      return { success: true, loginUser: userDataResponse }
    } catch (error) {
      console.error('Error en authService.login:', error)
      return {
        success: false,
        message: 'Error de conexión al servidor',
      }
    }
  },
}
