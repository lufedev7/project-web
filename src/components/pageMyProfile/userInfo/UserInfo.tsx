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
    <div className='bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6'>
      <div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4'>
        <Image
          src={
            'https://aplication-web-storage.s3.us-east-2.amazonaws.com/1366_2000.jpg-1732422954076'
          }
          alt={'Imagen de perfil del usuario'}
          width={100}
          height={100}
          className='rounded-full w-24 h-24 sm:w-32 sm:h-32'
        />
        <div className='text-center sm:text-left'>
          <h2 className='text-2xl font-bold'>{userName}</h2>
          <p className='text-gray-600'>{email}</p>
          <p className='text-gray-600'>{phoneNumber}</p>
          <p className='text-sm mt-2'>{seller ? 'Vendedor' : 'Comprador'}</p>
          <Button onClick={onEdit} className='mt-2'>
            Editar información
          </Button>
        </div>
      </div>
    </div>
  )
}
