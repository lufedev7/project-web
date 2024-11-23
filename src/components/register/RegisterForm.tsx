'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function RegisterForm() {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    userImage: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUserData({ ...userData, userImage: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const validatePasswords = (): boolean => {
    if (userData.password !== userData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return false
    }
    setPasswordError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('entra')
    setAuthError(null)

    try {
      const formData = new FormData()
      formData.append('userName', userData.userName)
      formData.append('email', userData.email)
      formData.append('password', userData.password)
      formData.append('phoneNumber', userData.phoneNumber)
      if (userData.userImage) {
        formData.append('userImage', userData.userImage)
      }
      const formDatas = {
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
        userImage: 'image3',
      }
      console.log(formDatas)
      const url = process.env.NEXT_PUBLIC_URL_REGISTER || ''
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formDatas),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }

      console.log('Registration successful')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message)
      } else {
        setAuthError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }
  /*  const handleSubmit2 = async () => {
    console.log('entra')
    setIsLoading(true)

    setAuthError(null)

    try {
      const formDatas = {
        userName: 'luisf',
        email: 'luis@test.com',
        password: 'fernando',
        phoneNumber: '3113259753',
        userImage: 'imgtest',
      }

      const url = process.env.NEXT_PUBLIC_URL_REGISTER || ''
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formDatas),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }

      console.log('Registration successful')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message)
      } else {
        setAuthError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }
 */
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
          <div className='mb-4'>
            <label
              htmlFor='userName'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Nombre de usuario
            </label>
            <input
              type='text'
              id='userName'
              name='userName'
              placeholder='Ingresa tu nombre de usuario'
              required
              value={userData.userName}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Ingresa tu correo electrónico'
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Ingresa tu contraseña'
              required
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value })
                if (userData.confirmPassword) {
                  validatePasswords()
                }
              }}
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Confirmar Contraseña
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirma tu contraseña'
              required
              value={userData.confirmPassword}
              onChange={(e) => {
                setUserData({ ...userData, confirmPassword: e.target.value })
                if (userData.password) {
                  validatePasswords()
                }
              }}
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
            {passwordError && (
              <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='phoneNumber'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Número de teléfono
            </label>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              placeholder='Ingresa tu número de teléfono'
              required
              value={userData.phoneNumber}
              onChange={(e) =>
                setUserData({ ...userData, phoneNumber: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='userImage'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Imagen de perfil
            </label>
            <input
              type='file'
              id='userImage'
              name='userImage'
              accept='image/*'
              onChange={handleImageChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
            {imagePreview && (
              <div className='mt-2 flex justify-center'>
                <Image
                  src={imagePreview}
                  alt='Profile Preview'
                  className='w-24 h-24 rounded-full object-cover'
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>

          {authError && (
            <div className='text-red-500 text-sm mb-4 bg-red-50 p-2 rounded'>
              {authError}
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-NormalBlue text-white py-2 px-4 rounded-md hover:bg-NormalBlueHover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Registrando...
              </span>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>
        <button>prueba</button>
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
