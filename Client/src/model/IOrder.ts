export interface Order {
    id: number
    orderDate: Date
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    customerId: string
    orderStatus: number
    orderItems: OrderItem[]
    subTotal: number
    deliveryFee: number
  }
  
  export interface OrderItem {
    id: number
    productId: number
    productName: string
    price: number
    quantity: number
    productImage: string
  }