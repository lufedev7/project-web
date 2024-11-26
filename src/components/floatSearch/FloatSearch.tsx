'use client'
import React, { useCallback } from 'react'
import { Transition } from '../transitions/Transitions'
import Loader from './Loader.module.css'
import Styles from '../searchs/SearchStyles.module.css'
import { RiSearch2Line } from 'react-icons/ri'
import { useSearch } from '@/customHooks/useSearch'
import { useSearchMarket } from '@/customHooks/useSearchMarket'
import debounce from 'just-debounce-it'
import { SearchResultsList } from './SearchResultsList'

export default function FloatSearch() {
  const { search, setSearch, error } = useSearch()
  const { loading, responseSearch, getSearch } = useSearchMarket(search)
  const debounceGetMovis = useCallback(
    debounce((newSearch: string) => {
      void getSearch(newSearch)
    }, 300),
    [getSearch],
  )
  //console.log(responseSearch)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovis(newSearch)
  }
  //console.log(responseSearch)
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
                  onChange={handleChange}
                  name='query'
                />
              </div>
            </div>
          </div>
          {!loading && error !== 'null' && (
            <span className='absolute text-xs leading-3 pl-6'>{error}</span>
          )}
          {!loading && responseSearch === undefined && error === 'null' && (
            <span className='absolute text-xs leading-3 pl-6'>
              Sin resultados
            </span>
          )}
          {loading && (
            <div className={`${Loader.loaderSideBar} absolute `}></div>
          )}
        </div>
        {responseSearch && responseSearch.length > 0 && (
          <SearchResultsList results={responseSearch} />
        )}
        <div className='flex gap-4 place-items-center'></div>
      </div>
    </Transition>
  )
}
