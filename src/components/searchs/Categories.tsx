'use client'
import React, { useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { GrFormDown, GrFormUp } from 'react-icons/gr'
import { FloatCategoriesProps } from '../floatCategories/CategoriesTypes.type'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'

export default function Categories({ categories }: FloatCategoriesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setTitleCategorias } = useGlobalContext()
  const handleGetTitleCategories = (props: string) => {
    setTitleCategorias(props)
  }
  return (
    <div
      className='mb-2 md:mb-0 flex items-center gap-2 justify-between cursor-pointer'
      onClick={() => {
        setIsOpen(!isOpen)
      }}
      onKeyDown={() => {
        setIsOpen(!isOpen)
      }}
    >
      <BiCategory className='text-white' />
      <div className='text-white'>
        <p>Categorias</p>
      </div>
      {isOpen ? (
        <GrFormUp className='text-white' />
      ) : (
        <GrFormDown className='text-white' />
      )}
      {isOpen && (
        <div className='absolute top-[145px] md:top-[70px] flex flex-col bg-NormalBlue text-white z-50 p-4 mt-[0.09rem] rounded-lg shadow-ligth w-[230px] '>
          {categories.map(({ productCategoryId, categoryName }) => (
            <button
              key={productCategoryId}
              className='hover:border-b-[1px]'
              onClick={() => handleGetTitleCategories(categoryName)}
            >
              {categoryName}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
