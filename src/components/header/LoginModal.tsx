import React, { useEffect } from 'react'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'
import Link from 'next/link'
import { useAuth } from '@/customHooks/useAuth'
export default function LoginModal() {
  const { openMenuLogin, loginSucces, setLoginSucces } = useGlobalContext()
  const { logout } = useAuth()
  useEffect(() => {
    const storedLoginSuccess = localStorage.getItem('loginSuccess')
    if (storedLoginSuccess === 'true') {
      setLoginSucces(true)
    } else if (storedLoginSuccess === 'false') {
      setLoginSucces(false)
    }
  }, [])

  return (
    <div
      className={`${openMenuLogin ? 'absolute z-[1] justify-center  grid bg-NormalBlue w-[100px]  px-4 py-2 rounded-lg text-white top-[154px]  md:top-[73px]  xl:top-[71px]' : 'hidden'} `}
    >
      {!loginSucces ? (
        <>
          <Link href='/login' className='hover:border-b-[1px]'>
            Ingresar
          </Link>
          <Link href='/register' className='hover:border-b-[1px]'>
            Registrar
          </Link>
        </>
      ) : (
        <>
          <button onClick={logout} className='hover:border-b-[1px]'>
            Salir
          </button>
          <Link href='/profile' className='hover:border-b-[1px]'>
            Mi perfil
          </Link>
        </>
      )}
    </div>
  )
}
