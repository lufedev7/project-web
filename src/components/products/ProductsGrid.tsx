import React from 'react'
import { Content } from './ProductsTypes.type'
import Image from 'next/image'
import Link from 'next/link'
import { FormatPrice } from '@/utils/FormatPrices'

import useImagesCarrucel from '@/customHooks/useImagesCarrucel'
import { IoPricetagSharp } from 'react-icons/io5'

interface ProductsGridProps {
  products: Content
  customKey: number
}
const ProductsGrid = React.memo((props: ProductsGridProps): JSX.Element => {
  const {
    imageUrls,
    productId,
    productName,
    productDescription,
    isNew,
    originalPrice,
    salePrice,
    stockQuantity,
  } = props.products

  const { currentImagesIndex, currentImageUrl, isTransitionImg } =
    useImagesCarrucel(imageUrls)
  return (
    <div key={productId}>
      <Link
        key={productId}
        href={`/product/${productId}`}
        className=' shadow-ligth hover:shadow-xl rounded-2xl transition-all duration-300 cursor-pointer'
      >
        <div className='relative -z-[1]' key={productId}>
          <h2 className='ml-3 mb-3 text-gradienpri font-semibold'>{isNew}</h2>
          <div className='relative'>
            {isNew && (
              <div className='absolute flex items-center px-2 py-1 rounded-lg bg-slate-50 top-2 right-2 text-secundary'>
                <Image
                  src={'/assets/new.png'}
                  alt={'Image new'}
                  width={30}
                  height={30}
                />
              </div>
            )}

            <Image
              src={currentImageUrl}
              alt={`Image ${currentImagesIndex + 1} of services`}
              width={150}
              height={150}
              className={`transition-opacity duration-500 object-cover w-full h-[350px] sm:h-[200px] rounded-t-2xl ${isTransitionImg ? 'opacity-20' : 'opacity-100'}`}
            />
            <div className='px- py-5'>
              <p className='text-secundary px-2'>{productName}</p>
              <p className='text-secondary px-2'>{productDescription}</p>
              <div className='px-2'>
                {stockQuantity !== null ? (
                  <div>
                    <span className='pr-2'>{stockQuantity}</span>
                    <span>disponibles</span>
                  </div>
                ) : (
                  <span>Sin unidades</span>
                )}
              </div>
              <div className='font-semibold flex px-2 place-items-center'>
                <IoPricetagSharp />
                <span className='pl-2 pr-8'>Precio nuevo</span>
                <span className='text-red-500 line-through'>
                  {FormatPrice(Number(originalPrice))}
                </span>
              </div>
              <div className='font-semibold flex place-items-center bg-LightBlueActive px-2 py-2 rounded-lg'>
                <IoPricetagSharp />
                <span className='pl-2 pr-3'>Precio de venta</span>
                <span className='text-green-700'>
                  {FormatPrice(Number(salePrice))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
})
ProductsGrid.displayName = 'ProductsGrid'
export default ProductsGrid
