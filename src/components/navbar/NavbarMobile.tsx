import React from 'react'
import { dataNavbar } from './NavbarData.data'
import Link from 'next/link'
import useWindowWidth from '@/customHooks/useWindowsSize'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'
import Categories from '../searchs/Categories'
import { FloatCategoriesProps } from '../floatCategories/CategoriesTypes.type'
export default function NavbarMobile({ categories }: FloatCategoriesProps) {
  const windowSize = useWindowWidth()
  const { openMenuMobile } = useGlobalContext()
  return (
    <div
      className={`${
        openMenuMobile && windowSize < 768
          ? 'absolute  z-[1] justify-center left-0 top-40  grid bg-NormalBlue  w-full px-4 py-3 '
          : 'hidden'
      } gap-5 md:flex md:top-10 `}
    >
      {dataNavbar.map(({ id, name, link }) => (
        <Link
          key={id}
          href={link}
          className='hover:text-secundary hover:border-b-[1px] text-white'
        >
          {name}
        </Link>
      ))}
      <Categories categories={categories} />
    </div>
  )
}
