'use client'
import useGetProducts from '@/customHooks/useGetProducts'
import React, { useEffect, useMemo } from 'react'
import { Transition } from '../transitions/Transitions'
import Loader from './Loader.module.css'
import ErrorFetch from '@/_child/ErrorFetch'
import { motion } from 'framer-motion'
import { Content } from './ProductsTypes.type'
import ProductsGrid from './ProductsGrid'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useGlobalContext } from '@/app/context/OpenMenuMobileContext'

const Products = () => {
  const { getMoreFetching, response, isLatest, batRequest, loader } =
    useGetProducts()
  const {
    dataProducts,
    setProducts,
    isLatestGlobal,
    setIsLatestGlobal,
    isLatestFlag,
  } = useGlobalContext()
  const { titleCategorias } = useGlobalContext()
  useEffect(() => {
    if (response && isLatestFlag) {
      setProducts(response)
      setIsLatestGlobal(isLatest)
    }
    if (!isLatestFlag) {
      setIsLatestGlobal(true)
    }
  }, [isLatest, isLatestFlag, response, setIsLatestGlobal, setProducts])
  const ProductList = useMemo(
    () =>
      dataProducts?.map((product: Content) => (
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
    [dataProducts],
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
            {titleCategorias}
          </h1>
          <InfiniteScroll
            dataLength={response.length + 12}
            next={getMoreFetching}
            key={'non-unique'}
            hasMore={!isLatestGlobal}
            loader={
              <div className='flex place-items-center justify-center'>
                <h1>loading</h1>
              </div>
            }
            endMessage={
              <div
                className=' font-bold text-2xl flex justify-center place-items-center sm:my-4 my-16'
                style={{ textAlign: 'center' }}
              >
                <h1 className='text-NormalBlue'>
                  Super!!! Lo has visto todo...{' '}
                </h1>
              </div>
            }
          >
            <div className=' grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
              {ProductList}
            </div>
          </InfiniteScroll>
        </Transition>
      ) : (
        <ErrorFetch />
      )}
    </section>
  )
}
export default Products
