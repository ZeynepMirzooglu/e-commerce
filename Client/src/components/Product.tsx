import { IProduct } from "../model/IProduct";

interface Props{
    product:IProduct
}

export function Product({product}:Props){
    return ( <>
      {product.isActive ? (
     <div>
      <h3>{product.name}</h3>
       <p> {product.price}</p> </div>
      ) : <p>Ürün Satışta Değil</p>}
    </>
    );
  }