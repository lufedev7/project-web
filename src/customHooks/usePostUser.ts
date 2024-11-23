import { registerService } from '@/security/register'
interface UserDataType {
  userName: string
  email: string
  password: string
  phoneNumber: string
  userImage: string
}
export default function usePostUser() {
  const register = async (dataUser: UserDataType) => {
    try {
      const response = await registerService.login(dataUser)

      if (response.success) {
        console.log(response.loginUser)
      }
    } catch (error) {
      console.error('Error en login:', error)
    } finally {
    }
  }

  return register
}
