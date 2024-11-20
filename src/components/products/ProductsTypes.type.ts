export interface ProductsTypes {
  message: string
  data: {
    content: Content[]
    pageNo: number
    pageSize: number
    totalElements: number
    totalPages: number
    last: boolean
  }
  success: boolean
}

export interface Content {
  productId: number
  productName: string
  categoryId: number
  productDescription: string
  isNew: boolean
  userId: number
  originalPrice: number
  salePrice: number
  isSold: boolean
  imageUrls: string[]
  stockQuantity: null
}
