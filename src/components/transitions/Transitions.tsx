'use client'
import { useEffect, useRef } from 'react'
import { type TransitionProps } from './Transitions.types'
import { useAnimation, useInView, motion } from 'framer-motion'
import { fadeIn } from './TransitionsFramer'
export function Transition(props: TransitionProps) {
  const { children, className } = props
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const mainsControl = useAnimation()
  const slideControls = useAnimation()
  useEffect(() => {
    if (isInView) {
      void mainsControl.start('visible')
      void slideControls.start('visible')
    }
  }, [isInView, mainsControl, slideControls])
  return (
    <div ref={ref}>
      <motion.div
        variants={fadeIn()}
        initial='hidden'
        animate={mainsControl}
        exit='hidden'
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
