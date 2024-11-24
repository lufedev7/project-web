import Image from 'next/image'

interface ProductCardProps {
  productId: number
  productName: string
  productDescription: string
  isNew: boolean
  originalPrice: number
  salePrice: number
  isSold: boolean
  imageUrls: string[]
  stockQuantity: number | null
}

export function ProductCard({
  productName,
  productDescription,
  isNew,
  originalPrice,
  salePrice,
  isSold,
  imageUrls,
  stockQuantity,
}: ProductCardProps) {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='relative'>
        <Image
          src={imageUrls[0]}
          alt={productName}
          width={300}
          height={300}
          className='w-full h-48 object-cover'
        />
        {isNew && (
          <span className='absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded'>
            Nuevo
          </span>
        )}
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2'>{productName}</h3>
        <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
          {productDescription}
        </p>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
          <div className='mb-2 sm:mb-0'>
            <span className='text-lg font-bold text-green-600'>
              ${salePrice.toFixed(2)}
            </span>
            {originalPrice > salePrice && (
              <span className='text-sm text-gray-500 line-through ml-2'>
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className='flex items-center'>
            {isSold ? (
              <span className='bg-red-500 text-white text-xs px-2 py-1 rounded'>
                Vendido
              </span>
            ) : (
              stockQuantity !== null && (
                <span className='text-sm text-gray-600'>
                  Stock: {stockQuantity}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
