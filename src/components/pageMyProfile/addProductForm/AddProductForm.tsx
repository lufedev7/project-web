import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import useFetchCategories from '@/customHooks/useFetchCategories'
import useFetchProfile from '@/customHooks/useFetchsProfile'
interface AddProductFormProps {
  userIdPost: number | undefined
  onSave: (productData: {
    productName: string
    productDescription: string
    userId: number | undefined
    originalPrice: number
    salePrice: number
    imageUrl: string
    stockQuantity: number
    categoryId: number
  }) => void
  onCancel: () => void
}

export function AddProductForm({
  onSave,
  onCancel,
  userIdPost,
}: AddProductFormProps) {
  const { postProducts, productError } = useFetchProfile()
  const { dataFetch } = useFetchCategories()

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [formErrors, setFormErrors] = useState<{
    salePrice?: string
    general?: string
  }>({})

  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    originalPrice: '',
    userId: userIdPost,
    salePrice: '',
    imageUrl: '',
    stockQuantity: '',
    categoryId: 0,
  })
  useEffect(() => {
    if (formErrors.salePrice || formErrors.general) {
      setFormErrors({})
    }
  }, [
    formData.salePrice,
    formData.originalPrice,
    formErrors.salePrice,
    formErrors.general,
  ])
  useEffect(() => {
    if (productError) {
      setFormErrors((prev) => ({
        ...prev,
        general: productError.message || 'Error al crear el producto',
      }))
    }
  }, [productError])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Validate sale price against original price
    if (name === 'salePrice' || name === 'originalPrice') {
      const originalPrice =
        name === 'originalPrice'
          ? parseFloat(value)
          : parseFloat(formData.originalPrice)
      const salePrice =
        name === 'salePrice'
          ? parseFloat(value)
          : parseFloat(formData.salePrice)

      if (
        !isNaN(originalPrice) &&
        !isNaN(salePrice) &&
        salePrice > originalPrice
      ) {
        setFormErrors((prev) => ({
          ...prev,
          salePrice: 'El precio de venta no puede ser mayor al precio original',
        }))
      } else {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.salePrice
          return newErrors
        })
      }
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }
  const handleFileUpload = async () => {
    if (!file) return null

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/s3-upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.url) {
        setImageUrl(data.url)
        return data.url
      }

      setUploading(false)
      setFile(null)
      return null
    } catch (error) {
      setUploading(false)
      console.error('Error al subir el archivo:', error)
      return null
    }
  }
  const handleCategoryChange = (categoryId: number) => {
    setFormData((prev) => ({ ...prev, categoryId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous errors
    setFormErrors({})

    // Validate form
    const errors: { salePrice?: string; general?: string } = {}

    // Category validation
    if (formData.categoryId === 0) {
      errors.general = 'Debes seleccionar una categoría.'
    }

    // Price validations
    const originalPrice = parseFloat(formData.originalPrice)
    const salePrice = parseFloat(formData.salePrice)

    if (isNaN(originalPrice) || isNaN(salePrice)) {
      errors.general = 'Los precios deben ser números válidos.'
    } else if (salePrice > originalPrice) {
      errors.salePrice =
        'El precio de venta no puede ser mayor al precio original'
    }

    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const uploadedImageUrl = file ? await handleFileUpload() : imageUrl
    const productData = {
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      salePrice: parseFloat(formData.salePrice),
      stockQuantity: parseInt(formData.stockQuantity),
      userId: formData.userId,
      categoryId: formData.categoryId,
      imageUrl: uploadedImageUrl || formData.imageUrl,
    }

    // Attempt to post product
    const result = await postProducts(productData)

    // Only call onSave if product creation was successful
    if (result) {
      onSave(productData)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 p-4 bg-LightBlue rounded-md shadow-md'
    >
      {formErrors.general && (
        <div className='bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative'>
          {formErrors.general}
        </div>
      )}
      <div>
        <Label htmlFor='productName'>Nombre del producto</Label>
        <Input
          type='text'
          id='productName'
          name='productName'
          value={formData.productName}
          onChange={handleChange}
          required
          className='border border-NormalBlue focus:ring-NormalBlue'
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
          minLength={10}
          className='w-full p-2 border border-NormalBlue focus:ring-NormalBlue rounded-md'
          placeholder='Describe el producto en al menos 10 caracteres'
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
          className='border border-NormalBlue focus:ring-NormalBlue'
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
          className={`border ${
            formErrors.salePrice
              ? 'border-red-500 focus:ring-red-500'
              : 'border-NormalBlue focus:ring-NormalBlue'
          }`}
        />
        {formErrors.salePrice && (
          <p className='text-red-500 text-sm mt-1'>{formErrors.salePrice}</p>
        )}
      </div>

      <div>
        <Label htmlFor='stockQuantity'>Stock del producto</Label>
        <Input
          type='number'
          id='stockQuantity'
          name='stockQuantity'
          value={formData.stockQuantity}
          onChange={handleChange}
          required
          min='0'
          step='1'
          className='border border-NormalBlue focus:ring-NormalBlue'
        />
      </div>
      <div>
        <Label htmlFor='imageUrl'>Subir imagen</Label>
        <Input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='border border-NormalBlue focus:ring-NormalBlue'
        />
      </div>

      {file && (
        <div className='text-sm text-gray-600'>
          Archivo seleccionado: {file.name}
        </div>
      )}

      {imageUrl && (
        <div className='text-sm text-green-600'>
          URL de la imagen: {imageUrl}
        </div>
      )}

      <div>
        <Label>Categoría</Label>
        <div className='grid grid-cols-2 gap-2'>
          {dataFetch.map((category) => (
            <div key={category.productCategoryId} className='flex items-center'>
              <input
                type='radio'
                id={`category-${category.productCategoryId}`}
                name='categoryId'
                value={category.productCategoryId}
                checked={formData.categoryId === category.productCategoryId}
                onChange={() =>
                  handleCategoryChange(category.productCategoryId)
                }
                className='mr-2'
              />
              <Label htmlFor={`category-${category.productCategoryId}`}>
                {category.categoryName}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-end space-x-2'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          className='bg-NormalLightHover hover:bg-NormalLightActive'
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          className='bg-NormalBlue hover:bg-NormalBlueHover text-white'
        >
          Agregar producto
        </Button>
      </div>
    </form>
  )
}
