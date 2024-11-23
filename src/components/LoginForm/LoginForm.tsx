'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/customHooks/useAuth'
export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  })
  const { login, error: authError, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(credentials)
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-LightBlue to-DarkBlue'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className=' flex-row  place-items-center'>
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
            Ingresar
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Usuario o e-mail
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Ingresa tu correo o e-mail'
              required
              value={credentials.usernameOrEmail}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  usernameOrEmail: e.target.value,
                })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
          </div>
          <div className='mb-6'>
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
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
              disabled={isLoading}
            />
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
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>
        <p className='text-center text-sm text-gray-600 mt-4'>
          ¿No tienes una cuenta?
          <Link href='/register' className='text-NormalBlue hover:underline'>
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
