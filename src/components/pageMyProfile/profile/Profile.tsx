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
import Image from 'next/image'

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
]

export interface SellerTypes {
  id: number
  buyerId: number
  productId: number
  imageUrls: string[]
  productName: string
  userName: string
  salePrice: number
  transactionDate: Date
  status: string
  paymentMethod: string
}
export interface BuyerTypes {
  id: number
  buyerId: number
  productId: number
  imageUrls: string[]
  productName: string
  userName: string
  salePrice: number
  transactionDate: Date
  status: string
  paymentMethod: string
}

export default function Profile() {
  const {
    dataFetch,
    error,
    isLoading,
    refetch,
    dataProductUser,
    dataTransactions,
    updateUser,
    test,
    isSellerError,
  } = useFetchProfile()
  const [userData, setUserData] = useState(initialUserData)
  const [products, setProducts] = useState(initialProducts)

  const [soldProducts, setSoldProducts] = useState(initialSoldProducts)
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const handleEditUser = (newUserData: typeof userData) => {
    setUserData({ ...userData, ...newUserData })
    setIsEditingUser(false)
    if (dataFetch?.id) {
      updateUser(dataFetch.id, newUserData)
    }
    console.log(dataFetch?.id)
    console.log(newUserData)
  }
  console.log(test, 'Test')
  const handleAddProduct = (newProduct: {
    imageUrl: string
    productName: string
    productDescription: string
    originalPrice: number
    salePrice: number
    categoryId: number
  }) => {
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

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#197fe6]'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f8fafc]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='space-y-8'>
          <section className='transition-all duration-300'>
            {isEditingUser ? (
              <EditUserForm
                {...userData}
                onSave={handleEditUser}
                onCancel={() => setIsEditingUser(false)}
              />
            ) : (
              <UserInfo {...dataFetch} onEdit={() => setIsEditingUser(true)} />
            )}
          </section>
          {dataFetch?.seller && (
            <section className='bg-white rounded-lg shadow-sm border border-[#e8f2fd] p-6'>
              <Tabs defaultValue='selling' className='space-y-6'>
                <TabsList className='flex space-x-2 border-b border-[#e8f2fd] overflow-x-auto'>
                  <TabsTrigger
                    value='selling'
                    className='px-4 py-2 text-[#595959] hover:text-[#197fe6] data-[state=active]:text-[#197fe6] data-[state=active]:border-b-2 data-[state=active]:border-[#197fe6]'
                  >
                    Mis productos
                  </TabsTrigger>
                  <TabsTrigger
                    value='sold'
                    className='px-4 py-2 text-[#595959] hover:text-[#197fe6] data-[state=active]:text-[#197fe6] data-[state=active]:border-b-2 data-[state=active]:border-[#197fe6]'
                  >
                    Vendidos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='selling' className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-[#092c51]'>
                      Mis productos
                    </h2>
                    {!isAddingProduct && (
                      <Button
                        onClick={() => setIsAddingProduct(true)}
                        className='bg-[#197fe6] hover:bg-[#1772cf] active:bg-[#1466b8] text-white px-6 py-2 rounded-lg transition-colors duration-200'
                      >
                        <svg
                          className='w-5 h-5 mr-2 inline-block'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                          />
                        </svg>
                        Agregar producto
                      </Button>
                    )}
                  </div>

                  {isAddingProduct ? (
                    <AddProductForm
                      userIdPost={dataFetch?.id}
                      onSave={handleAddProduct}
                      onCancel={() => setIsAddingProduct(false)}
                    />
                  ) : (
                    <>
                      {isSellerError ? (
                        <div className='flex flex-col items-center justify-center p-8 text-[#595959]'>
                          <p className='text-lg mb-4'>No eres un vendedor</p>
                          <p>
                            Actualiza tu perfil para comenzar a vender productos
                          </p>
                        </div>
                      ) : !dataProductUser ||
                        !dataProductUser.data ||
                        !dataProductUser.data.content ? (
                        <div className='flex flex-col items-center justify-center p-8 text-[#595959]'>
                          <p className='text-lg mb-4'>
                            No hay productos disponibles
                          </p>
                        </div>
                      ) : dataProductUser.data.content.length === 0 ? (
                        <div className='flex flex-col items-center justify-center p-8 text-[#595959]'>
                          <p className='text-lg mb-4'>
                            Aún no tienes productos publicados
                          </p>
                          <p>¡Comienza agregando tu primer producto!</p>
                        </div>
                      ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                          {dataProductUser.data.content.map((product) => (
                            <div
                              key={product.productId}
                              className='bg-white rounded-lg shadow-sm border border-[#e8f2fd] hover:shadow-md transition-shadow duration-200'
                            >
                              {/* Renderizado de producto existente */}
                              <div className='relative aspect-square overflow-hidden rounded-t-lg'>
                                <Image
                                  src={
                                    product.imageUrls[0] ||
                                    '/assets/backgroundNoImage.webp'
                                  }
                                  alt={product.productName}
                                  width={150}
                                  height={150}
                                  className='object-cover w-full h-full'
                                />
                                {product.isNew && (
                                  <span className='absolute top-2 right-2 bg-[#197fe6] text-white text-xs font-semibold px-2 py-1 rounded'>
                                    Nuevo
                                  </span>
                                )}
                              </div>
                              <div className='p-4'>
                                <h3 className='text-lg font-semibold text-[#092c51] truncate'>
                                  {product.productName}
                                </h3>
                                <p className='text-sm text-[#595959] line-clamp-2 mb-2'>
                                  {product.productDescription}
                                </p>
                                <div className='flex justify-between items-center'>
                                  <div className='space-y-1'>
                                    {product.originalPrice !==
                                      product.salePrice && (
                                      <p className='text-sm text-[#737373] line-through'>
                                        $
                                        {product.originalPrice.toLocaleString()}
                                      </p>
                                    )}
                                    <p className='text-lg font-bold text-[#197fe6]'>
                                      ${product.salePrice.toLocaleString()}
                                    </p>
                                  </div>
                                  <span className='text-sm text-[#595959]'>
                                    Stock: {product.stockQuantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                <TabsContent value='sold' className='space-y-6'>
                  <h2 className='text-2xl font-bold text-[#092c51]'>
                    Productos vendidos
                  </h2>

                  {!dataTransactions?.data.sellerTransactions ? (
                    <div className='flex flex-col items-center justify-center p-8 text-[#595959]'>
                      <p className='text-lg mb-4'>
                        No hay transacciones disponibles
                      </p>
                    </div>
                  ) : dataTransactions.data.sellerTransactions.length === 0 ? (
                    <div className='flex flex-col items-center justify-center p-8 text-[#595959]'>
                      <p className='text-lg mb-4'>
                        Aún no has vendido ningún producto
                      </p>
                      <p>
                        ¡Tus ventas aparecerán aquí cuando realices tu primera
                        venta!
                      </p>
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                      {dataTransactions.data.sellerTransactions.map(
                        (transaction) => (
                          <div
                            key={transaction.id}
                            className='bg-white rounded-lg shadow-sm border border-[#e8f2fd] hover:shadow-md transition-shadow duration-200'
                          >
                            <div className='relative aspect-square overflow-hidden rounded-t-lg'>
                              <Image
                                src={
                                  transaction.imageUrls[0] ||
                                  '/assets/backgroundNoImage.webp'
                                }
                                alt={transaction.productName}
                                width={150}
                                height={150}
                                className='object-cover w-full h-full'
                              />
                              <span
                                className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                                  transaction.status === 'COMPLETED'
                                    ? 'bg-green-500 text-white'
                                    : transaction.status === 'PENDING'
                                      ? 'bg-yellow-500 text-white'
                                      : 'bg-gray-500 text-white'
                                }`}
                              >
                                {transaction.status}
                              </span>
                            </div>
                            <div className='p-4'>
                              <h3 className='text-lg font-semibold text-[#092c51] truncate'>
                                {transaction.productName}
                              </h3>
                              <div className='mt-2 space-y-2'>
                                <p className='text-sm text-[#595959]'>
                                  Comprador: {transaction.userName}
                                </p>
                                <p className='text-sm text-[#595959]'>
                                  Fecha:{' '}
                                  {new Date(
                                    transaction.transactionDate,
                                  ).toLocaleDateString()}
                                </p>
                                <p className='text-sm text-[#595959]'>
                                  Método de pago: {transaction.paymentMethod}
                                </p>
                                <p className='text-lg font-bold text-[#197fe6]'>
                                  ${transaction.salePrice.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {soldProducts.map((product) => (
                      <SoldProductCard key={product.productId} {...product} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          )}

          <section className='bg-white rounded-lg shadow-sm border border-[#e8f2fd] p-6'>
            <h2 className='text-2xl font-bold text-[#092c51] mb-6'>
              Productos comprados
            </h2>

            {!dataTransactions?.data.buyerTransactions ? (
              <div className='flex flex-col items-center justify-center p-8 text-[#595959]'>
                <p className='text-lg mb-4'>No hay compras disponibles</p>
              </div>
            ) : dataTransactions.data.buyerTransactions.length === 0 ? (
              <div className='flex flex-col items-center justify-center p-8 text-[#595959]'>
                <p className='text-lg mb-4'>
                  Aún no has comprado ningún producto
                </p>
                <p>
                  ¡Tus compras aparecerán aquí cuando realices tu primera
                  compra!
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                {dataTransactions.data.buyerTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className='bg-white rounded-lg shadow-sm border border-[#e8f2fd] hover:shadow-md transition-shadow duration-200'
                  >
                    <div className='relative aspect-square overflow-hidden rounded-t-lg'>
                      <Image
                        src={
                          transaction.imageUrls[0] ||
                          '/assets/backgroundNoImage.webp'
                        }
                        alt={transaction.productName}
                        width={150}
                        height={150}
                        className='object-cover w-full h-full'
                      />
                      <span
                        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                          transaction.status === 'COMPLETED'
                            ? 'bg-green-500 text-white'
                            : transaction.status === 'PENDING'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-500 text-white'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <div className='p-4'>
                      <h3 className='text-lg font-semibold text-[#092c51] truncate'>
                        {transaction.productName}
                      </h3>
                      <div className='mt-2 space-y-2'>
                        <p className='text-sm text-[#595959]'>
                          Vendedor: {transaction.userName}
                        </p>
                        <p className='text-sm text-[#595959]'>
                          Fecha:{' '}
                          {new Date(
                            transaction.transactionDate,
                          ).toLocaleDateString()}
                        </p>
                        <p className='text-sm text-[#595959]'>
                          Método de pago: {transaction.paymentMethod}
                        </p>
                        <p className='text-lg font-bold text-[#197fe6]'>
                          ${transaction.salePrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
