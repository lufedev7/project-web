'use client'

import { useState } from 'react'
import { UserInfo } from '../userInfo/UserInfo'
import { ProductCard } from '../productCard/ProductCard'
import { SoldProductCard } from '../soldProductCard/SoldProductCard'
import { EditUserForm } from '../editUserForm/EditUserForm'
import { AddProductForm } from '../addProductForm/AddProductForm'
import { Button } from '../ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import useFetchProfile from '@/customHooks/useFetchsProfile'

// Simulamos la obtención de datos del servidor
const initialUserData = {
  id: 15,
  userName: 'Isabella Anderson',
  email: 'isabellaanderson@example.com',
  phoneNumber: '8899091122',
  userImage:
    'https://aplication-web-storage.s3.us-east-2.amazonaws.com/1366_2000.jpg-1732422954076',
  seller: true,
}

const initialProducts = [
  {
    productId: 14,
    productName: 'Guitar Hero Live Bundle',
    categoryId: 10,
    productDescription: 'Bundle Guitar Hero Live Juego Y 1 Guitarra - Wii U',
    isNew: true,
    userId: 15,
    originalPrice: 15320.78,
    salePrice: 8743.31,
    isSold: false,
    imageUrls: [
      'https://aplication-web-storage.s3.us-east-2.amazonaws.com/products/Bundle+Guitar+Hero+Live+Juego+Y+1+Guitarra+-+Wii+U(2).webp',
    ],
    stockQuantity: 1,
  },
  // Aquí puedes agregar más productos...
]

const initialPurchasedProducts = [
  {
    productId: 15,
    productName: 'PlayStation 5',
    categoryId: 1,
    productDescription: 'Consola de videojuegos de última generación',
    isNew: false,
    userId: 10,
    originalPrice: 12000,
    salePrice: 11500,
    isSold: true,
    imageUrls: [
      'https://aplication-web-storage.s3.us-east-2.amazonaws.com/1366_2000.jpg-1732422954076',
    ],
    stockQuantity: null,
  },
  // Aquí puedes agregar más productos comprados...
]

const initialSoldProducts = [
  {
    productId: 16,
    productName: 'iPhone 12 Pro',
    productDescription: 'Smartphone de última generación',
    salePrice: 9999.99,
    soldDate: '2023-05-15',
    imageUrl:
      'https://aplication-web-storage.s3.us-east-2.amazonaws.com/1366_2000.jpg-1732422954076',
    buyerName: 'John Doe',
  },
  // Aquí puedes agregar más productos vendidos...
]

export default function Profile() {
  const { dataFetch, error, isLoading, refetch } = useFetchProfile()
  console.log(dataFetch)
  const [userData, setUserData] = useState(initialUserData)
  const [products, setProducts] = useState(initialProducts)
  const [purchasedProducts, setPurchasedProducts] = useState(
    initialPurchasedProducts,
  )
  const [soldProducts, setSoldProducts] = useState(initialSoldProducts)
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const handleEditUser = (newUserData) => {
    setUserData({ ...userData, ...newUserData })
    setIsEditingUser(false)
  }

  const handleAddProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      productId: products.length + 1,
      isNew: true,
      userId: userData.id,
      isSold: false,
      imageUrls: [newProduct.imageUrl],
      stockQuantity: 1,
    }
    setProducts([...products, productToAdd])
    setIsAddingProduct(false)
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      {isEditingUser ? (
        <EditUserForm
          {...userData}
          onSave={handleEditUser}
          onCancel={() => setIsEditingUser(false)}
        />
      ) : (
        <UserInfo {...dataFetch} onEdit={() => setIsEditingUser(true)} />
      )}

      {userData.seller && (
        <Tabs defaultValue='selling' className='mt-8'>
          <TabsList className='w-full justify-start overflow-x-auto'>
            <TabsTrigger value='selling'>En venta</TabsTrigger>
            <TabsTrigger value='sold'>Vendidos</TabsTrigger>
          </TabsList>
          <TabsContent value='selling'>
            <h2 className='text-xl sm:text-2xl font-bold mb-4'>
              Productos en venta
            </h2>
            {isAddingProduct ? (
              <AddProductForm
                onSave={handleAddProduct}
                onCancel={() => setIsAddingProduct(false)}
              />
            ) : (
              <Button onClick={() => setIsAddingProduct(true)} className='mb-4'>
                Agregar nuevo producto
              </Button>
            )}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8'>
              {products.map((product) => (
                <ProductCard key={product.productId} {...product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value='sold'>
            <h2 className='text-xl sm:text-2xl font-bold mb-4'>
              Productos vendidos
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8'>
              {soldProducts.map((product) => (
                <SoldProductCard key={product.productId} {...product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <h2 className='text-xl sm:text-2xl font-bold mb-4'>
        Productos comprados
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        {purchasedProducts.map((product) => (
          <ProductCard key={product.productId} {...product} />
        ))}
      </div>
    </div>
  )
}
