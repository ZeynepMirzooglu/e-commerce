import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import { Header } from "./Header";
import { ProductList } from "./ProductList";

function App() {
  const [products,setProducts]=useState<IProduct[]>([]);
  //Tek seferlik çalışır(Render edilsin diye)
  useEffect(()=>{ fetch("http://localhost:5188/api/products").then((res)=>res.json()).then((data)=>setProducts(data));},[]);
  function addProduct(){
    setProducts([...products,{id:Date.now(), name:"Product 4", price:400,isActive:true,stock:100,imageUrl:"",description:""}]);
  }
  return (
    <><Header products={products} /><ProductList  products={products} addProduct={addProduct}/></>
  )
}
export default App
