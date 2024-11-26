'use client'

import Footer from '@/components/footer/Footer'
import BannerProfile from '@/components/pageMyProfile/banner/BannerProfile'
import React from 'react'
import ProductsById from '@/components/pageProducts/ProductsById'
interface ClientPageProps {
  idProducts: string
}
export default function ClientPage({ idProducts }: ClientPageProps) {
  const productId = idProducts
  console.log(productId, 'en client')
  return (
    <main>
      <BannerProfile />
      <ProductsById productId={productId} />
      <Footer />
    </main>
  )
}
