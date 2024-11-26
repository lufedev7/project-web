'use client'
import useGetProductsById from '@/customHooks/useGetProductsBYId'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
interface Props {
  productId: string
}
export default function ProductsById({ productId }: Props) {
  const { dataFetch } = useGetProductsById(productId)
  const [isLoading, setIsLoading] = useState(true)
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

  return (
    <div className='bg-background text-foreground p-6 rounded-lg shadow-md'>
      {/* Título del producto */}
      <h1 className='text-2xl font-bold text-DarkerBlue mb-2'>{productName}</h1>

      {/* Categoría e información adicional */}
      <p className='text-sm text-DarkLight'>Categoría: {categoryName}</p>
      {isNew && (
        <span className='inline-block bg-NormalBlue text-background px-2 py-1 rounded text-xs ml-2'>
          Nuevo
        </span>
      )}

      {/* Descripción del producto */}
      <p className='text-base text-DarkerLight my-4'>{productDescription}</p>

      {/* Precios */}
      <div className='flex gap-4 items-baseline mb-4'>
        {salePrice < originalPrice ? (
          <>
            <span className='line-through text-DarkLightHover text-base'>
              ${originalPrice.toFixed(2)}
            </span>
            <span className='text-lg font-bold text-NormalBlue'>
              ${salePrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span className='text-lg font-bold text-NormalBlue'>
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Imágenes del producto */}
      {imageUrls.length > 0 && (
        <div className='flex gap-2 mt-4 overflow-x-auto'>
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className='flex-shrink-0 w-36 h-36 relative rounded-lg overflow-hidden shadow'
            >
              <Image
                src={url}
                alt={`Imagen ${index + 1} de ${productName}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>
      )}

      {/* Cantidad en stock */}
      <p className='text-sm text-NormalBlueHover mt-4'>
        Cantidad disponible: {stockQuantity}
      </p>
    </div>
  )
}
