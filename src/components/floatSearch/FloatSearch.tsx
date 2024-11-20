'use client'
import React from 'react'
import { Transition } from '../transitions/Transitions'

import Styles from '../searchs/SearchStyles.module.css'
import { RiSearch2Line } from 'react-icons/ri'

export default function FloatSearch() {
  return (
    <Transition className='absolute   left-0 right-0  mx-auto'>
      <div className='flex-col place-items-center justify-between  mdmobile:py-10 gap-4 py-6  bm:py-[7rem] mobileg:py-[9rem] md:py-16  md:flex md:flex-row px-24'>
        <div className=''>
          <div className='relative group  '>
            <div className='w-[250px] mobileg:w-[300px] lg:w-[420px] sticky  top-1  py-1-5 z-50 my-1 mx-4'>
              <div className='  items-center rounded-full h-8 flex p-3 relative'>
                <RiSearch2Line />
                <input
                  className={Styles.Imput}
                  type='text'
                  placeholder='Buscar Market '
                  name='query'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-4 place-items-center'></div>
      </div>
    </Transition>
  )
}
