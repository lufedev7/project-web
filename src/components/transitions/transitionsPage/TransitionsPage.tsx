'use client'
import { AnimatePresence, motion } from 'framer-motion'

export default function TransitionsPage() {
  return (
    <AnimatePresence mode='wait'>
      <div>
        <motion.div
          className=' fixed top-0 bottom-0 rigth-full w-screen h-screen z-30 bg-secundary'
          variants={transitionVariantsPage}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
        ></motion.div>
        <motion.div
          className=' fixed top-0 bottom-0 rigth-full w-screen h-screen z-20 bg-secundary/70 opacity-60'
          variants={transitionVariantsPage}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
        ></motion.div>
      </div>
    </AnimatePresence>
  )
}
const transitionVariantsPage = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
}
