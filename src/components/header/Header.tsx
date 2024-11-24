'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import Navbar from '../navbar/Navbar'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'
import LoginModal from './LoginModal'
import { FloatCategoriesProps } from '../floatCategories/CategoriesTypes.type'

import { usePathname } from 'next/navigation'

export default function Header({ categories }: FloatCategoriesProps) {
  const {
    openMenuMobile,
    setOpenMenuMobile,
    setOpenMenuLogin,
    openMenuLogin,
    loginSucces,
  } = useGlobalContext()
  const pathname = usePathname()
  const [nameUser, setNameUser] = useState<string>('')
  useEffect(() => {
    const storedNameUser = localStorage.getItem('nameUser')
    if (storedNameUser) {
      setNameUser(storedNameUser)
    }
  }, [])
  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (pathname === '/') {
        e.preventDefault()
        window.location.reload()
      }
    },
    [pathname],
  )
  return (
    <div className='container mx-auto my-4 bg-NormalBlue rounded-full '>
      <div className='flex items-center justify-between px-5 md:px-4'>
        <Link href='/' onClick={handleLogoClick}>
          <Image
            src='/assets/logo.png'
            alt='Logo'
            width={90}
            height={40}
            className='bg-white my-2 mx-8 rounded-xl'
          />
        </Link>
        <CiMenuFries
          className='block text-2xl md:hidden cursor-pointer'
          onClick={() => {
            setOpenMenuMobile(!openMenuMobile)
          }}
        />
        <Navbar categories={categories} />
        {loginSucces && (
          <div className='text-white'>
            <span className='pr-2'>Hola,</span>
            <span>{nameUser}</span>
          </div>
        )}

        <div className=''>
          <FiUser
            className='text-white h-8 w-6 mr-6 cursor-pointer'
            onClick={() => {
              setOpenMenuLogin(!openMenuLogin)
              console.log(openMenuLogin)
            }}
          />
          <LoginModal />
        </div>
      </div>
    </div>
  )
}
