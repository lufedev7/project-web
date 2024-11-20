'use client'
import React, { useState } from 'react'

export default function S3UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return
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
      }

      setUploading(false)
      setFile(null)
    } catch (error) {
      setUploading(false)
      console.error('Error al subir el archivo:', error)
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Upload files to S3 Bucket</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='border p-2 rounded'
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

        <button
          type='submit'
          disabled={!file || uploading}
          className='bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300'
        >
          {uploading ? 'Uploading....' : 'Upload'}
        </button>
      </form>
    </div>
  )
}
