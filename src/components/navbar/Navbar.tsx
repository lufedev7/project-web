'use client'
import useScrolling from '@/customHooks/useScrolling'
import { AnimatePresence } from 'framer-motion'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import { FloatCategoriesProps } from '../floatCategories/CategoriesTypes.type'

export default function Navbar({ categories }: FloatCategoriesProps) {
  const scrolling = useScrolling()
  return (
    <AnimatePresence>
      {scrolling ? <NavbarDesktop /> : <NavbarMobile categories={categories} />}
    </AnimatePresence>
  )
}
