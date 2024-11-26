import Link from 'next/link'

interface SearchResultProps {
  result: string
  productId: number
}
export const SearchResult = (props: SearchResultProps) => {
  const { result, productId } = props
  console.log()
  return (
    <Link
      key={productId}
      href={`/product/${productId}`}
      className=' px-3 py-5 hover:bg-[#efefef] cursor-pointer'
    >
      {result}
    </Link>
  )
}
