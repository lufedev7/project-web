'use client'
import { useRegisterForm } from '@/customHooks/useRegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import { InputField, ImageUploadField } from './InputField'
import { SubmitButton } from './SubmitButton'

export default function RegisterForm() {
  const {
    userData,
    imagePreview,
    isLoading,
    authError,
    passwordError,
    handleImageChange,
    handleSubmit,
    setUserData,
    validatePasswords,
  } = useRegisterForm()

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value })
    if (userData.confirmPassword) {
      validatePasswords()
    }
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserData({ ...userData, confirmPassword: e.target.value })
    if (userData.password) {
      validatePasswords()
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-LightBlue to-DarkBlue'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='flex-row place-items-center'>
          <Link href='/'>
            <Image
              src='/assets/logo.png'
              alt='Logo'
              width={90}
              height={40}
              className='bg-white my-2 mx-8 rounded-xl'
            />
          </Link>
          <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Registrarse
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label='Nombre de usuario'
            id='userName'
            type='text'
            placeholder='Ingresa tu nombre de usuario'
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
            disabled={isLoading}
          />

          <InputField
            label='Correo electrónico'
            id='email'
            type='email'
            placeholder='Ingresa tu correo electrónico'
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            disabled={isLoading}
          />

          <InputField
            label='Contraseña'
            id='password'
            type='password'
            placeholder='Ingresa tu contraseña'
            value={userData.password}
            onChange={handlePasswordChange}
            disabled={isLoading}
          />

          <InputField
            label='Confirmar Contraseña'
            id='confirmPassword'
            type='password'
            placeholder='Confirma tu contraseña'
            value={userData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            disabled={isLoading}
            error={passwordError ? passwordError : undefined}
          />

          <InputField
            label='Número de teléfono'
            id='phoneNumber'
            type='tel'
            placeholder='Ingresa tu número de teléfono'
            value={userData.phoneNumber}
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
            disabled={isLoading}
          />

          <ImageUploadField
            label='Imagen de perfil'
            id='userImage'
            onChange={handleImageChange}
            disabled={isLoading}
            imagePreview={imagePreview}
          />

          {authError && (
            <div className='text-red-500 text-sm mb-4 bg-red-50 p-2 rounded'>
              {authError}
            </div>
          )}

          <SubmitButton
            isLoading={isLoading}
            text='Registrarse'
            loadingText='Registrando...'
          />
        </form>

        <p className='text-center text-sm text-gray-600 mt-4'>
          ¿Ya tienes una cuenta?
          <Link href='/login' className='text-NormalBlue hover:underline ml-1'>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
