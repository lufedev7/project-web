'use client'
import useGetProducts from '@/customHooks/useGetProducts'
import React, { useCallback, useMemo } from 'react'
import { Transition } from '../transitions/Transitions'
import Loader from './Loader.module.css'
import ErrorFetch from '@/_child/ErrorFetch'
import { motion } from 'framer-motion'
import { Content } from './ProductsTypes.type'
import ProductsGrid from './ProductsGrid'
const Products = () => {
  const { getMoreFetching, response, isLatest, batRequest, loader } =
    useGetProducts()
  const handleGetMoreProducts = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      getMoreFetching().catch((error) => {
        console.error('Error al obtener más servicios:', error)
      })
    },
    [getMoreFetching],
  )
  console.log(response, isLatest, batRequest, loader)
  const servicesList = useMemo(
    () =>
      response?.map((product: Content) => (
        <motion.div
          key={product.productId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <ProductsGrid products={product} customKey={0} />
        </motion.div>
      )),
    [response],
  )
  return (
    <section>
      {loader === 'loader' && !batRequest && (
        <div className='flex place-content-center pt-12'>
          <div className={Loader.loaderMainMenu}></div>
        </div>
      )}
      {response && !batRequest ? (
        <Transition className='px-4 my-8 md:py-2 md:px-40'>
          <h1 className='pt-10 pb-2 font-bold text-2xl text-black'>
            Todos lo productos
          </h1>
          <div className=' grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
            {servicesList}
          </div>
          <div className='flex place-content-center'>
            {isLatest ? (
              <button
                className='hover:bg-red-400 text-black hover:text-white px-8 py-2 border rounded-md border-blue-400'
                onClick={handleGetMoreProducts}
              >
                MOSTRAR MÁS
              </button>
            ) : (
              <div
                className=' font-bold text-2xl flex justify-center place-items-center sm:my-4 my-16'
                style={{ textAlign: 'center' }}
              >
                <h1 className='titleError'>Super!!! Lo has visto todo </h1>
              </div>
            )}
          </div>
        </Transition>
      ) : (
        <ErrorFetch />
      )}
    </section>
  )
}
export default Products
