'use client'

import Footer from '@/components/footer/Footer'
import BannerProfile from '@/components/pageMyProfile/banner/BannerProfile'
import Profile from '@/components/pageMyProfile/profile/Profile'

export default function page() {
  return (
    <main>
      <BannerProfile />
      <Profile />
      <Footer />
    </main>
  )
}
