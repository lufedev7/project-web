export const animationNavbar = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      stiffness: 100,
      damping: 20,
      type: 'spring',
    },
  },
  exit: {
    y: -20,
    opacity: 0,
  },
}
