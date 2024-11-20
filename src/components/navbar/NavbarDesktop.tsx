import { motion } from 'framer-motion'
import { animationNavbar } from './NavbarAnimate'
import Link from 'next/link'
import { dataNavbar } from './NavbarData.data'
export default function NavbarDesktop() {
  return (
    <motion.nav
      key={1}
      variants={animationNavbar}
      initial='initial'
      animate='animate'
      exit='exit'
      className='ml-auto mr-auto md:fixed z-[9999] right-0 left-0 px-6 py-3 text-white bg-gray-400/40 top-10 rounded-3xl backdrop-blur w-fit'
    >
      <div className='items-center hidden gap-5 md:flex'>
        {dataNavbar.map(({ id, name, link }) => (
          <Link
            key={id}
            href={link}
            className='hover:text-secundary hover:border-b-[1px] hover:border-secundary'
          >
            {name}
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
