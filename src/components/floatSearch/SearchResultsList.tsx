import { SearchResult } from './SearchResult'
import { useRef, useEffect } from 'react'
interface Searchprops {
  results: any[]
}

export const SearchResultsList = (props: Searchprops) => {
  const { results } = props
  const ref = useRef<HTMLDivElement>(null)
  console.log(results)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.style.display = 'none'
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={ref}
      className='z-[20] mt-28 hidden text-NormalBlueHover  max-h-80 absolute overflow-y-auto w-[35%] bg-LightBlueActive lg:flex flex-col shadow-xl rounded-xl border'
    >
      {results.map((search) => {
        return (
          <SearchResult
            result={search.productName as string}
            productId={search.productId as number}
            key={search.productId}
          />
        )
      })}
    </div>
  )
}
