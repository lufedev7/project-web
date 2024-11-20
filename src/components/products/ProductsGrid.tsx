import React from 'react'
import { Content } from './ProductsTypes.type'
import Image from 'next/image'
import Link from 'next/link'
import { FormatPrice } from '@/utils/FormatPrices'
import { LuPalmtree } from 'react-icons/lu'
import { TbBrandHipchat } from 'react-icons/tb'
import { LiaStarSolid } from 'react-icons/lia'
import useImagesCarrucel from '@/customHooks/useImagesCarrucel'
interface ProductsGridProps {
  products: Content
  customKey: number
}
const ProductsGrid = React.memo((props: ProductsGridProps): JSX.Element => {
  const {
    imageUrls,
    productId,
    productName,
    categoryId,
    productDescription,
    isNew,
    userId,
    originalPrice,
    salePrice,
    isSold,
    stockQuantity,
  } = props.products
  console.log(imageUrls)
  const { currentImagesIndex, currentImageUrl, isTransitionImg } =
    useImagesCarrucel(imageUrls)
  return (
    <div key={productId}>
      <Link
        key={productId}
        href={`/properties/${productId}`}
        className=' shadow-ligth hover:shadow-xl rounded-2xl transition-all duration-300 cursor-pointer'
      >
        <div className='relative -z-[1]' key={productId}>
          <h2 className='ml-3 mb-3 text-gradienpri font-semibold'>{isNew}</h2>
          <div className='relative'>
            {isNew && (
              <div className='absolute flex items-center px-2 py-1 rounded-lg bg-slate-50 top-2 right-2 text-secundary'>
                <LiaStarSolid />
              </div>
            )}

            <Image
              src={currentImageUrl}
              alt={`Image ${currentImagesIndex + 1} of services`}
              width={150}
              height={150}
              className={`transition-opacity duration-500 object-cover w-full h-[350px] sm:h-[200px] rounded-t-2xl ${isTransitionImg ? 'opacity-20' : 'opacity-100'}`}
            />
            <div className='px-3 py-5'>
              <p className='text-secundary'>{productName}</p>
              <p className='text-secondar'>{productDescription}</p>

              <p className='font-semibold text-gradienpri'>
                {FormatPrice(Number(salePrice))}
              </p>
              <div className='gap-4 mt-2 xl:flex'>
                <div className='flex items-center my-2 justify-center px-2 py-1 rounded-lg bg-slate-300/30'>
                  <LuPalmtree />
                  <span className='ml-2 text-[12px] leading-tight '>
                    {FormatPrice(Number(originalPrice))}
                  </span>
                  <span className='ml-2 text-[12px] '>Me gustas</span>
                </div>
                <div className='flex items-center my-2 justify-center px-2 py-1 rounded-lg bg-slate-300/30'>
                  <TbBrandHipchat />
                  <span className='ml-2 text-[12px] '></span>
                  <span className='ml-2 text-[12px] '>Comentarios</span>
                </div>
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
