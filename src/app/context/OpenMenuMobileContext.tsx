'use client'
import { Content } from '@/components/products/ProductsTypes.type'
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
  loginSucces: boolean
  setLoginSucces: Dispatch<SetStateAction<boolean>>
  titleCategorias: string
  setTitleCategorias: Dispatch<SetStateAction<string>>
  dataProducts: Content[]
  setProducts: Dispatch<SetStateAction<Content[]>>
  isLatestGlobal: boolean
  setIsLatestGlobal: Dispatch<SetStateAction<boolean>>
  isLatestFlag: boolean
  setIsLatestFlag: Dispatch<SetStateAction<boolean>>
}
const GlobalContext = createContext<ContextProps>({
  openMenuMobile: false,
  setOpenMenuMobile: () => {},
  openMenuLogin: false,
  setOpenMenuLogin: () => {},
  loginSucces: false,
  setLoginSucces: () => {},
  titleCategorias: 'Todos los productos',
  setTitleCategorias: () => {},
  dataProducts: [],
  setProducts: () => {},
  isLatestGlobal: false,
  setIsLatestGlobal: () => {},
  isLatestFlag: false,
  setIsLatestFlag: () => {},
})
export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false)
  const [openMenuLogin, setOpenMenuLogin] = useState(false)
  const [loginSucces, setLoginSucces] = useState(false)
  const [titleCategorias, setTitleCategorias] = useState('Todos los productos')
  const [dataProducts, setProducts] = useState<Content[]>([])
  const [isLatestGlobal, setIsLatestGlobal] = useState(true)
  const [isLatestFlag, setIsLatestFlag] = useState(true)
  const contextValue = useMemo(
    () => ({
      openMenuMobile,
      setOpenMenuMobile,
      openMenuLogin,
      setOpenMenuLogin,
      loginSucces,
      setLoginSucces,
      titleCategorias,
      setTitleCategorias,
      dataProducts,
      setProducts,
      isLatestGlobal,
      setIsLatestGlobal,
      isLatestFlag,
      setIsLatestFlag,
    }),
    [
      openMenuMobile,
      openMenuLogin,
      titleCategorias,
      dataProducts,
      loginSucces,
      isLatestGlobal,
      isLatestFlag,
    ],
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
