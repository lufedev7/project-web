export async function ProductsForCategories(idCategory: number) {
  const url =
    process.env.NEXT_PUBLIC_URL_PRODUCTS_BY_CATEGORIE +
    '/' +
    idCategory.toString()
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error al realizar el fetch')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
