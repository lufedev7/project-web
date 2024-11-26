import Image from 'next/image'
interface InputFieldProps {
  label: string
  id: string
  type: string
  placeholder: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  error?: string
  accept?: string
}

export const InputField = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = true,
  error,
  accept,
}: InputFieldProps) => (
  <div className='mb-4'>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700 mb-2'
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      accept={accept}
      {...(type !== 'file' ? { value: value } : {})}
      className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
      disabled={disabled}
    />
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
  </div>
)

interface ImageUploadFieldProps {
  label: string
  id: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  error?: string
  imagePreview?: string
}

export const ImageUploadField = ({
  label,
  id,
  onChange,
  disabled = false,
  required = true,
  error,
  imagePreview,
}: ImageUploadFieldProps) => (
  <div className='mb-4'>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700 mb-2'
    >
      {label}
    </label>
    <input
      type='file'
      id={id}
      name={id}
      onChange={onChange}
      accept='image/*'
      className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-NormalBlue focus:border-NormalBlue'
      disabled={disabled}
      required={required}
    />
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    {imagePreview && (
      <div className='mt-2 flex justify-center'>
        <Image
          src={imagePreview}
          alt='Profile Preview'
          className='w-24 h-24 rounded-full object-cover'
          width={200}
          height={200}
        />
      </div>
    )}
  </div>
)
