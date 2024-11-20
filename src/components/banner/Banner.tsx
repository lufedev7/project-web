'use client'
import React from 'react'
import Header from '../header/Header'
import FloatSearch from '../floatSearch/FloatSearch'
import FloatCategories from '../floatCategories/FloatCategories'
import useFetchCategories from '@/customHooks/useFetchCategories'

export default function Banner() {
  const { dataFetch } = useFetchCategories()

  return (
    <div className=' relative mx-auto'>
      <div className='pt-20 md:pt-0 min-h-[80vh] bg-banner bg-no-repeat bg-cover bg-center  relative flex flex-col items-center '>
        <Header categories={dataFetch} />
        <div className='h-full flex md:items-center mt-[2rem] md:mt-[6rem]'>
          <div className='max-w-3xl text-center text-white bg-DarkBlue/50 p-4 rounded-lg'>
            <h2 className='text-5xl font-bold'>
              ENCUENTRA LOS MEJORES PRODUCTOS PARA TI{' '}
            </h2>
          </div>
        </div>
        <FloatSearch />
        <FloatCategories categories={dataFetch} />
      </div>
    </div>
  )
}
