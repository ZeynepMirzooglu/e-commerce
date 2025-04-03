import { useEffect, useState } from "react";
import { IProduct } from "../../model/IProduct";
import { ProductList } from "./ProductList";
import { CircularProgress } from "@mui/material";
import requests from "../../api/request";


export default function CatalogPage() {
    const [products,setProducts]=useState<IProduct[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
    //Tek seferlik çalışır(Render edilsin diye)
    useEffect(()=>{ requests.Catalog.list()
        .then((data)=>setProducts(data))
        .catch((error)=>console.log(error))
        .finally(()=>setLoading(false));},[]);
    if(loading){
        return <CircularProgress/>
    }

    return (
    <ProductList products={products}/>
    );
}
