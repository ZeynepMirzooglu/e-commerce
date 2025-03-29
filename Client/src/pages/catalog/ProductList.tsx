import { Grid2 } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { Product } from "./Product";

interface Props{
    products:IProduct[]
  
}

export function ProductList({products}:Props){
    return (
      <>
      <Grid2 container spacing={2}>

      {products.map((p:IProduct)=>(
          <Grid2 size={{xs:12,md:4, lg:3}} key={p.id} >
        <Product product={p} />
        </Grid2>
      
      ))}
      </Grid2>
    </>
    );
  }