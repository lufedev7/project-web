export function FormatPrice(price: number) {
  return Number(price).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  })
}
