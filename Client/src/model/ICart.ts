export interface CartItem {
productId:number; 
productName:string;  
cartItemId:number;
imageUrl:string;
price:number;


quantity:number;
}

export interface Cart {
    cartId:number;
    customerId:string;
    cartItems:CartItem[];
}