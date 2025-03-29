import { CircularProgress, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/request";


export default function ProductDetailsPage() {
   //const {id} =useParams<{id:string}>();
   const {id} =useParams();
   const [product,setProduct]=useState<IProduct | null>(null);
   const [loading,setLoading]=useState<boolean>(true);


   useEffect(()=>{
     //id && requests.Catalog.details(parseInt(id))
      requests.Catalog.details(Number(id))
      .then((data)=>setProduct(data))
      .catch((error)=>console.log(error))
      .finally(()=>setLoading(false))
   },[id]);
   if(loading){
      return <CircularProgress/>
   }
   if(!product){
      return <Typography variant="h5">Product not found</Typography>
   }
   return (
      <Grid2 container spacing={2}>
         <Grid2 size={{xl:3,lg:4, md:5,sm:6,xs:12}}>
            <img src={`http://localhost:5188/images/${product.imageUrl}`} style={{width:"100%"}}/>
         </Grid2>
         <Grid2 size={{xl:9,lg:8, md:7,sm:6,xs:12}}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{mb:2}}></Divider>
            <Typography variant="h4" color="secondary">{(product.price/1000).toFixed(3)} ₺</Typography>
            <TableContainer>
               <Table>
                  <TableBody>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>Description</TableCell>
                     <TableCell>{product.description}</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>Stock</TableCell>
                     <TableCell>{product.stock}</TableCell>
                  </TableRow>
                  </TableBody>

               </Table>
            </TableContainer>
         </Grid2>
      </Grid2>
    )
 }