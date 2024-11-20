import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
  },
})

async function uploadFileToS3(file: Buffer, fileName: string) {
  const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
  const region = process.env.NEXT_PUBLIC_AWS_S3_REGION

  if (!bucketName) {
    throw new Error('AWS S3 Bucket name is not defined')
  }

  const fileKey = `${fileName}-${Date.now()}`

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: file,
    ContentType: 'image/jpg',
  })

  try {
    await s3Client.send(command)
    const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`
    return fileUrl
  } catch (error) {
    console.error('Error in uploadFileToS3:', error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME) {
      return NextResponse.json(
        { error: 'AWS S3 configuration is missing' },
        { status: 500 },
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileUrl = await uploadFileToS3(buffer, file.name)

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: fileUrl,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}
