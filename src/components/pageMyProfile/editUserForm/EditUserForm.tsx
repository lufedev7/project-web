'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

interface EditUserFormProps {
  id: number
  userName: string
  email: string
  phoneNumber: string
  onSave: (userData: {
    userName: string
    email: string
    phoneNumber: string
  }) => void
  onCancel: () => void
}

export function EditUserForm({
  userName,
  email,
  phoneNumber,
  onSave,
  onCancel,
}: EditUserFormProps) {
  const [formData, setFormData] = useState({ userName, email, phoneNumber })
  const [touched, setTouched] = useState({
    userName: false,
    email: false,
    phoneNumber: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-[#e8f2fd] p-6 md:p-8'>
      <h2 className='text-2xl font-bold text-[#092c51] mb-6'>
        Editar información de perfil
      </h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-4'>
          <div className='relative'>
            <Label
              htmlFor='userName'
              className='block text-sm font-medium text-[#092c51] mb-2'
            >
              Nombre de usuario
            </Label>
            <Input
              type='text'
              id='userName'
              name='userName'
              value={formData.userName}
              onChange={handleChange}
              onBlur={() => handleBlur('userName')}
              className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200
                focus:ring-2 focus:ring-[#197fe6] focus:border-transparent
                ${
                  touched.userName && !formData.userName
                    ? 'border-red-500 bg-red-50'
                    : 'border-[#e8f2fd] hover:border-[#ddecfb]'
                }`}
              placeholder='Ingresa tu nombre de usuario'
              required
            />
          </div>

          <div className='relative'>
            <Label
              htmlFor='email'
              className='block text-sm font-medium text-[#092c51] mb-2'
            >
              Correo electrónico
            </Label>
            <div className='relative'>
              <Input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200
                  focus:ring-2 focus:ring-[#197fe6] focus:border-transparent
                  ${
                    touched.email && !formData.email
                      ? 'border-red-500 bg-red-50'
                      : 'border-[#e8f2fd] hover:border-[#ddecfb]'
                  }`}
                placeholder='nombre@ejemplo.com'
                required
              />
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#595959]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
          </div>

          <div className='relative'>
            <Label
              htmlFor='phoneNumber'
              className='block text-sm font-medium text-[#092c51] mb-2'
            >
              Número de teléfono
            </Label>
            <div className='relative'>
              <Input
                type='tel'
                id='phoneNumber'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={() => handleBlur('phoneNumber')}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200
                  focus:ring-2 focus:ring-[#197fe6] focus:border-transparent
                  ${
                    touched.phoneNumber && !formData.phoneNumber
                      ? 'border-red-500 bg-red-50'
                      : 'border-[#e8f2fd] hover:border-[#ddecfb]'
                  }`}
                placeholder='(123) 456-7890'
                required
              />
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#595959]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-[#e8f2fd]'>
          <Button
            type='button'
            onClick={onCancel}
            className='w-full sm:w-auto bg-white text-[#595959] border border-[#e8f2fd] hover:bg-[#e6e6e6] active:bg-[#cccccc] px-6 py-2 rounded-lg transition-colors duration-200'
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            className='w-full sm:w-auto bg-[#197fe6] hover:bg-[#1772cf] active:bg-[#1466b8] text-white px-6 py-2 rounded-lg transition-colors duration-200'
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditUserForm
