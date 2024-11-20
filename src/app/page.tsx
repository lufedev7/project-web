import Link from 'next/link'
import Banner from '../components/banner/Banner'

export default function Home() {
  return (
    <main className=''>
      <Banner />
      <Link href={'/aws'}>
        <span className='bg-red-300'>AWS</span>
      </Link>
    </main>
  )
}
