import { useEffect } from "react";
import { fetchProducts, selectProducts} from "./catalogSlice";
import { ProductList } from "./ProductList";
import { CircularProgress } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/store";



export default function CatalogPage() {
    const products = useAppSelector(selectProducts);
    const {status,isLoaded} = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();
    useEffect(()=>{if(!isLoaded) dispatch(fetchProducts())},[isLoaded]);
    if(status === 'pendingFetchProducts')  return <CircularProgress/>
    return (
    <ProductList products={products}/>
    );
}


