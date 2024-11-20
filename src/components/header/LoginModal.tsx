import React from 'react'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'
import Link from 'next/link'
export default function LoginModal() {
  const { openMenuLogin } = useGlobalContext()
  return (
    <div
      className={`${openMenuLogin ? 'absolute z-[1] justify-center  grid bg-NormalBlue w-[100px]  px-4 py-2 rounded-lg text-white top-[154px]  md:top-[73px]  xl:top-[71px]' : 'hidden'} `}
    >
      <Link href='/' className='hover:border-b-[1px]'>
        Login
      </Link>
      <Link href='/' className='hover:border-b-[1px]'>
        Registrar
      </Link>
    </div>
  )
}
