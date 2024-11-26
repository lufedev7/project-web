import Image from 'next/image'
import { Button } from '../ui/Button'

interface UserInfoProps {
  userName: string
  email: string
  phoneNumber: string
  userImage: string
  seller: boolean
  onEdit: () => void
}

export function UserInfo({
  userName,
  email,
  phoneNumber,
  userImage,
  seller,
  onEdit,
}: UserInfoProps) {
  return (
    <div className='bg-white rounded-lg transition-all duration-200 hover:shadow-lg p-6 md:p-8 mb-6 border border-[#e8f2fd]'>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8'>
        <div className='relative'>
          <div className='relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-[#e8f2fd] transition-all duration-200 hover:ring-[#ddecfb]'>
            <Image
              src={userImage || '/assets/backgroundNoImage.webp'}
              alt={`Imagen de perfil de ${userName}`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 112px, 144px'
            />
          </div>
        </div>

        {/* User Info Container */}
        <div className='flex flex-col text-center md:text-left flex-grow'>
          <h2 className='text-2xl md:text-3xl font-bold text-[#092c51] mb-2'>
            {userName}
          </h2>

          <div className='space-y-2 mb-4'>
            <p className='text-[#595959] flex items-center justify-center md:justify-start gap-2'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              {email}
            </p>
            <p className='text-[#595959] flex items-center justify-center md:justify-start gap-2'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                />
              </svg>
              {phoneNumber}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-4'>
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                seller
                  ? 'bg-[#e8f2fd] text-[#197fe6]'
                  : 'bg-[#e6e6e6] text-[#595959]'
              }`}
            >
              {seller ? 'Vendedor' : 'Comprador'}
            </span>

            <Button
              onClick={onEdit}
              className='w-full sm:w-auto bg-[#197fe6] hover:bg-[#1772cf] active:bg-[#1466b8] text-white px-6 py-2 rounded-lg transition-colors duration-200'
            >
              Editar información
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
