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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='userName'>Nombre de usuario</Label>
        <Input
          type='text'
          id='userName'
          name='userName'
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor='email'>Correo electrónico</Label>
        <Input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor='phoneNumber'>Número de teléfono</Label>
        <Input
          type='tel'
          id='phoneNumber'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className='flex justify-end space-x-2'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancelar
        </Button>
        <Button type='submit'>Guardar cambios</Button>
      </div>
    </form>
  )
}
