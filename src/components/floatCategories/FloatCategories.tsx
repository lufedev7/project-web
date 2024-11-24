import React, { useMemo } from 'react'
import { Transition } from '../transitions/Transitions'
import { type FloatCategoriesProps } from './CategoriesTypes.type'
import Image from 'next/image'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'

import { ProductsForCategories } from '../../services/ProductsForCategories'
export default function FloatCategories({ categories }: FloatCategoriesProps) {
  const randomCategories = useMemo(() => {
    const defaultCategory = { categoryName: '', categoryDescription: '' }
    const shuffled = [...categories].sort(() => Math.random() - 0.5)
    return Array.from({ length: 4 }, (_, i) => shuffled[i] || defaultCategory)
  }, [categories])

  const { setTitleCategorias, setProducts, setIsLatestFlag } =
    useGlobalContext()
  const handleGetTitleCategories = async (
    props: string,
    idCategory: number,
  ) => {
    try {
      const data = await ProductsForCategories(idCategory)
      setTitleCategorias(props)
      setProducts(data.data.content)
      setIsLatestFlag(false)
      console.log(data.data.content)
    } catch (error) {
      console.error('Error al obtener la data', error)
    }
  }

  return (
    <Transition className='absolute hidden md:inline bottom-10 md:-bottom-20 left-0 right-0 md:w-[90%] xl:w-[65%] mx-auto'>
      <div className='flex-col justify-between gap-4 py-4  rounded-md md:flex md:flex-row  px-4'>
        <button
          className='flex flex-col items-center bg-white p-4 transition-all hover:bg-LightBlueHover cursor-pointer rounded-lg shadow-md w-full md:w-64 h-30'
          onClick={() =>
            handleGetTitleCategories(
              randomCategories[0]?.categoryName,
              randomCategories[0].productCategoryId,
            )
          }
        >
          <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2'>
            {randomCategories[0]?.categoryImage ? (
              <Image
                src={randomCategories[0].categoryImage}
                alt={'Logo de categorias'}
                width={30}
                height={30}
              />
            ) : (
              <svg
                className='w-6 h-6 text-blue-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </div>
          <h3 className='font-medium'>{randomCategories[0]?.categoryName}</h3>
          <p className='text-sm text-gray-500'>
            {randomCategories[0]?.categoryDescription}
          </p>
        </button>

        <button
          className='flex flex-col items-center bg-white p-4 transition-all hover:bg-LightBlueHover cursor-pointer rounded-lg shadow-md w-full md:w-64 h-40'
          onClick={() =>
            handleGetTitleCategories(
              randomCategories[1]?.categoryName,
              randomCategories[1].productCategoryId,
            )
          }
        >
          <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2'>
            {randomCategories[1]?.categoryImage ? (
              <Image
                src={randomCategories[1].categoryImage}
                alt={'Logo de categorias'}
                width={30}
                height={30}
              />
            ) : (
              <svg
                className='w-6 h-6 text-blue-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </div>
          <h3 className='font-medium'>{randomCategories[1]?.categoryName}</h3>
          <p className='text-sm text-gray-500'>
            {randomCategories[1]?.categoryDescription}
          </p>
        </button>

        <button
          className='flex flex-col items-center bg-white p-4 transition-all hover:bg-LightBlueHover cursor-pointer rounded-lg shadow-md w-full md:w-64 h-40'
          onClick={() =>
            handleGetTitleCategories(
              randomCategories[2]?.categoryName,
              randomCategories[2].productCategoryId,
            )
          }
        >
          <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2'>
            {randomCategories[2]?.categoryImage ? (
              <Image
                src={randomCategories[2].categoryImage}
                alt={'Logo de categorias'}
                width={30}
                height={30}
              />
            ) : (
              <svg
                className='w-6 h-6 text-blue-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </div>
          <h3 className='font-medium'>{randomCategories[2]?.categoryName}</h3>
          <p className='text-sm text-gray-500'>
            {randomCategories[2]?.categoryDescription}
          </p>
        </button>

        <button
          className='flex flex-col items-center bg-white p-4 transition-all hover:bg-LightBlueHover cursor-pointer rounded-lg shadow-md w-full md:w-64 h-40'
          onClick={() =>
            handleGetTitleCategories(
              randomCategories[3]?.categoryName,
              randomCategories[3].productCategoryId,
            )
          }
        >
          <div className='w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2'>
            {randomCategories[3]?.categoryImage ? (
              <Image
                src={randomCategories[3].categoryImage}
                alt={'Logo de categorias'}
                width={30}
                height={30}
              />
            ) : (
              <svg
                className='w-6 h-6 text-blue-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </div>
          <h3 className='font-medium'>{randomCategories[3]?.categoryName}</h3>
          <p className='text-sm text-gray-500'>
            {randomCategories[3]?.categoryDescription}
          </p>
        </button>
      </div>
    </Transition>
  )
}
