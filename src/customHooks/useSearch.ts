import { useEffect, useState, useRef } from 'react'
enum TypeError {
  initialError = 'null',
  ErrorVoid = 'El campo esta vacio',
  ErrorNumber = 'No se puede buscar  con numeros',
  Errorlength = 'La busquedad debe tener como mínimo tres carácteres',
}
export function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string>(TypeError.initialError)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError(TypeError.ErrorVoid)
      return
    }
    if (/^\d+$/.exec(search)) {
      setError(TypeError.ErrorNumber)
      return
    }
    if (search.length < 3 && search.length > 0) {
      setError(TypeError.Errorlength)
      return
    }
    setError(TypeError.initialError)
  }, [search])
  return { search, setSearch, error }
}
