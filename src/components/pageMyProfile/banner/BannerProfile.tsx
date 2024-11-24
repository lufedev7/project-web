import React from 'react'
import HeaderProfile from './header/HeaderProfile'

export default function BannerProfile() {
  return (
    <div className=' relative mx-auto'>
      <div className='pt-20 md:pt-0 min-h-[40vh] bg-banner bg-no-repeat bg-cover bg-center  relative flex flex-col items-center '>
        <HeaderProfile />
        <div className='h-full flex md:items-center mt-[2rem] md:mt-[2rem]'>
          <div className='max-w-3xl text-center text-white bg-DarkBlue/50 p-4 rounded-lg'>
            <h2 className='text-5xl font-bold'>
              ENCUENTRA LOS MEJORES PRODUCTOS PARA TI{' '}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
