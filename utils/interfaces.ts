export type Cart = {
  userId: string
  items: Array<{
    id: string
    price: number
    quantity: number
    imageString: string
    name: string
  }>
}
