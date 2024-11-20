'use client'
import {
  type ReactNode,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  useState,
  useMemo,
} from 'react'
interface GlobalContextProviderProps {
  children: ReactNode
}
interface ContextProps {
  openMenuMobile: boolean
  setOpenMenuMobile: Dispatch<SetStateAction<boolean>>
  openMenuLogin: boolean
  setOpenMenuLogin: Dispatch<SetStateAction<boolean>>
}
const GlobalContext = createContext<ContextProps>({
  openMenuMobile: false,
  setOpenMenuMobile: () => {},
  openMenuLogin: false,
  setOpenMenuLogin: () => {},
})
export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false)
  const [openMenuLogin, setOpenMenuLogin] = useState(false)
  const contextValue = useMemo(
    () => ({
      openMenuMobile,
      setOpenMenuMobile,
      openMenuLogin,
      setOpenMenuLogin,
    }),
    [openMenuMobile, openMenuLogin],
  )
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}
export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error(
      'useGlobalContext debe usarse dentro de un GlobalContextProvider',
    )
  }
  return context
}
