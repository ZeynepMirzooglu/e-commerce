import { IProduct } from "../model/IProduct";
import { Product } from "./Product";

interface Props{
    products:IProduct[]
    addProduct:()=>void
}

export function ProductList({products,addProduct}:Props){
    return (
      <><h2>Product List</h2>
      {products.map((p:IProduct)=>(
        <>
          <Product product={p} key={p.id} /></>
      ))}
      <button onClick={addProduct}>Ürün Ekle</button>
     </>
    );
  }