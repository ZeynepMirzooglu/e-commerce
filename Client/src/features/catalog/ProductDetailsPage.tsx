import { CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import NotFound from "../../errors/NotFound";
import LoadingButton from '@mui/lab/LoadingButton';
import { AddShoppingCart } from "@mui/icons-material";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { fetchProductById, selectProductById } from "./catalogSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";

export default function ProductDetailsPage() {
   const {id} =useParams<{id:string}>();
   const {cart,status}=useAppSelector(state=>state.cart);
   const dispatch = useAppDispatch();
   const product= useAppSelector(state=>selectProductById(state,Number(id)));
   const {status:loading} =useAppSelector(state=>state.catalog);


   const item = cart?.cartItems.find(item=>item.productId === product?.id);
   useEffect(()=>{
      if(!product && id) dispatch(fetchProductById(Number(id)))
   },[id]);
   
   if(loading =="pendingFetchProductById"){
      return <CircularProgress/>
   }
   if(!product){
      return <NotFound/>
   }
   return (
      <Grid2 container spacing={2}>
         <Grid2 size={{xl:3,lg:4, md:5,sm:6,xs:12}}>
            <img src={`http://localhost:5188/images/${product.imageUrl}`} style={{width:"100%"}}/>
         </Grid2>
         <Grid2 size={{xl:9,lg:8, md:7,sm:6,xs:12}}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{mb:2}}></Divider>
            <Typography variant="h4" color="secondary">{currencyTRY.format(product.price)}</Typography>
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
            <Stack direction="row" sx={{mt:3}} alignItems="center" spacing={2}>
               <LoadingButton 
               variant="outlined" 
               loadingPosition="start" startIcon={<AddShoppingCart/>}
               loading={status =="pendingAddItem" + product.id}
               onClick={()=> dispatch(addItemToCart({productId:product.id}))}>
               Add to cart
               </LoadingButton>
               { 
                  item?.quantity! > 0 && (
                     <Typography variant="body2" >Sepetinize {item?.quantity} adet {product.name} eklendi.</Typography>
                  )
               }
            </Stack>
         </Grid2>
      </Grid2>
   )
}