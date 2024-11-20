import Image from 'next/image'
export default function ErrorFetch() {
  return (
    <div className='text-center flex justify-center place-items-center flex-col mt-6'>
      <Image
        src={'/not_found.png'}
        width={400}
        height={400}
        alt='Error'
      ></Image>
      <h1 className='titleError mt-4'>404 </h1>
      <h1 className='titleError'>¡Oops! Algo salio mal </h1>
    </div>
  )
}
