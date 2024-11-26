'use client'
import useGetProductsById from '@/customHooks/useGetProductsBYId'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Heart, Share2, ShieldCheck } from 'lucide-react'
interface Props {
  productId: string
}
export default function ProductsById({ productId }: Props) {
  const { dataFetch } = useGetProductsById(productId)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (dataFetch !== undefined) {
      setIsLoading(false)
      setError(null)
    } else if (dataFetch === undefined) {
      setError('Error al cargar el producto.')
      setIsLoading(false)
    }
  }, [dataFetch])

  console.log(dataFetch)

  if (isLoading)
    return (
      <div className='text-center text-lg font-semibold'>
        Cargando producto...
      </div>
    )
  if (error) return <div className='text-center text-red-600'>{error}</div>

  if (!dataFetch) {
    return null
  }
  const {
    productName,
    productDescription,
    categoryName,
    originalPrice,
    salePrice,
    imageUrls,
    stockQuantity,
    isNew,
  } = dataFetch
  const discountPercentage = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100,
  )
  return (
    <div className='max-w-6xl mx-auto p-4 bg-white shadow-lg'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='relative'>
          <div className='sticky top-4'>
            <div className='w-full aspect-square bg-LightBlue rounded-lg overflow-hidden mb-4 relative'>
              <Image
                src={imageUrls[currentImageIndex]}
                alt={productName}
                fill
                className='object-contain'
              />
              {isNew && (
                <span className='absolute top-4 left-4 bg-NormalBlue text-white px-2 py-1 rounded-full text-xs'>
                  Nuevo
                </span>
              )}
              <div className='absolute top-4 right-4 flex space-x-2'>
                <button className='bg-white/70 p-2 rounded-full hover:bg-white'>
                  <Share2 size={20} className='text-DarkerBlue' />
                </button>
                <button className='bg-white/70 p-2 rounded-full hover:bg-white'>
                  <Heart size={20} className='text-DarkerBlue' />
                </button>
              </div>
            </div>

            <div className='flex space-x-2 justify-center'>
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex
                      ? 'border-NormalBlue'
                      : 'border-transparent hover:border-LightBlueHover'
                  }`}
                >
                  <Image
                    src={url}
                    alt={`Miniatura ${index + 1}`}
                    width={64}
                    height={64}
                    className='object-cover'
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <p className='text-sm text-DarkLight mb-1'>{categoryName}</p>
            <h1 className='text-2xl font-bold text-DarkerBlue'>
              {productName}
            </h1>
          </div>

          <div className='bg-LightBlue p-4 rounded-lg'>
            {salePrice < originalPrice ? (
              <div>
                <div className='flex items-baseline space-x-3'>
                  <span className='text-3xl font-bold text-NormalBlue'>
                    ${salePrice.toFixed(2)}
                  </span>
                  <span className='text-base line-through text-DarkLight'>
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className='text-base text-NormalBlue font-semibold'>
                    {discountPercentage}% OFF
                  </span>
                </div>
                <p className='text-sm text-DarkBlue mt-2'>
                  Precio especial con descuento
                </p>
              </div>
            ) : (
              <div>
                <span className='text-3xl font-bold text-NormalBlue'>
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div>
            <p className='text-sm text-DarkBlue'>
              Stock disponible: {stockQuantity} unidades
            </p>
            <div className='flex items-center text-DarkBlue text-sm mt-2'>
              <ShieldCheck size={20} className='mr-2 text-NormalBlue' />
              Compra protegida
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-DarkerBlue mb-2'>
              Descripción
            </h3>
            <p className='text-base text-DarkerLight'>{productDescription}</p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <button className='bg-NormalBlue text-white py-3 rounded-lg hover:bg-DarkBlue transition-colors'>
              Comprar ahora
            </button>
            <button className='bg-LightBlue text-NormalBlue py-3 rounded-lg hover:bg-LightBlueHover transition-colors'>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
