'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
// import { Textarea } from '@/components/ui/textarea'

interface AddProductFormProps {
  onSave: (productData: {
    productName: string
    productDescription: string
    originalPrice: number
    salePrice: number
    imageUrl: string
  }) => void
  onCancel: () => void
}

export function AddProductForm({ onSave, onCancel }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    originalPrice: '',
    salePrice: '',
    imageUrl: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      salePrice: parseFloat(formData.salePrice),
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='productName'>Nombre del producto</Label>
        <Input
          type='text'
          id='productName'
          name='productName'
          value={formData.productName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor='productDescription'>Descripción del producto</Label>
        <textarea
          id='productDescription'
          name='productDescription'
          value={formData.productDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor='originalPrice'>Precio original</Label>
        <Input
          type='number'
          id='originalPrice'
          name='originalPrice'
          value={formData.originalPrice}
          onChange={handleChange}
          required
          min='0'
          step='0.01'
        />
      </div>
      <div>
        <Label htmlFor='salePrice'>Precio de venta</Label>
        <Input
          type='number'
          id='salePrice'
          name='salePrice'
          value={formData.salePrice}
          onChange={handleChange}
          required
          min='0'
          step='0.01'
        />
      </div>
      <div>
        <Label htmlFor='imageUrl'>URL de la imagen</Label>
        <Input
          type='url'
          id='imageUrl'
          name='imageUrl'
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className='flex justify-end space-x-2'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancelar
        </Button>
        <Button type='submit'>Agregar producto</Button>
      </div>
    </form>
  )
}
