import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/badge'

interface SoldProductCardProps {
  productId: number
  productName: string
  productDescription: string
  salePrice: number
  soldDate: string
  imageUrl: string
  buyerName: string
}

export function SoldProductCard({
  productName,
  productDescription,
  salePrice,
  soldDate,
  imageUrl,
  buyerName,
}: SoldProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg sm:text-xl'>{productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-4'>
          <div className='relative'>
            <Image
              src={imageUrl}
              alt={productName}
              width={300}
              height={300}
              className='w-full h-48 object-cover rounded-md'
            />
            <Badge variant='secondary' className='absolute top-2 right-2'>
              Vendido
            </Badge>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {productDescription}
          </p>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
            <span className='text-lg font-bold text-green-600'>
              ${salePrice.toFixed(2)}
            </span>
            <div className='text-sm text-gray-500 mt-2 sm:mt-0'>
              <p>Fecha de venta: {soldDate}</p>
              <p>Comprador: {buyerName}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
