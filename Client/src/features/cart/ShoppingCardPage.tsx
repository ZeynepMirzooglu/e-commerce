import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import requests from "../../api/request";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCart } from "./cartSlice";
export default function ShoppingCardPage() {

    const [status,setStatus] =useState({loading:false,id:""});
    const {cart}= useAppSelector(state=>state.cart);
    const dispatch = useAppDispatch();

    function handleAddItem(productId:number,id:string){
        setStatus({loading:true,id:id});
        requests.Cart.addItem(productId)
        .then(cart=>dispatch(setCart(cart)))
        .catch(error=>console.log(error))
        .finally(()=>setStatus({loading:false,id:""}));
    }
    function handleDeleteItem(productId:number,id:string,quantity=1){
        setStatus({loading:true,id:id});
        requests.Cart.removeItem(productId,quantity)
        .then((cart)=>dispatch(setCart(cart)))
        .catch(error=>console.log(error))
        .finally(()=>setStatus({loading:false,id:""}));
    }
    
    if(cart?.cartItems.length === 0) return <Alert severity="warning">Sepetinizde Ürün Bulunmamaktadır!</Alert>

    return (
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">Fiyat</TableCell>
                    <TableCell align="right">Adet</TableCell>
                    <TableCell align="right">Toplam</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {cart?.cartItems.map((row) => (
                    <TableRow
                    key={row.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        <img src={`http://localhost:5188/images/${row.imageUrl}`} style={{width:"50px", height:"60px"}}/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.productName}
                    </TableCell>
                    <TableCell align="right">{currencyTRY.format(row.price)}</TableCell>
                    <TableCell align="right">
                    <LoadingButton 
                    loading={status.loading && status.id === "add"+row.productId} 
                    onClick={()=>handleAddItem(row.productId,"add"+row.productId)}>
                    <AddCircleOutlineIcon/>
                    </LoadingButton>
                        {row.quantity}
                    <LoadingButton 
                    loading={status.loading && status.id === "del"+row.productId} 
                    onClick={()=>handleDeleteItem(row.productId,"del"+row.productId,1)}>
                    <RemoveCircleOutlineIcon/></LoadingButton>
                    </TableCell>
                    <TableCell align="right">{currencyTRY.format(row.price * row.quantity)}</TableCell>
                    <TableCell align="right">
                    <LoadingButton color="error" 
                    loading={status.loading && status.id === "delete"+row.productId} 
                    onClick={()=>{
                        handleDeleteItem(row.productId,"delete"+row.productId,row.quantity)
                        toast.error("Ürün Sepetten Çıkarıldı!")}}>
                        <Delete/>
                        </LoadingButton>
                    </TableCell>
                    </TableRow>
                ))}
                <CartSummary/>
                </TableBody>
            </Table>
            </TableContainer>
    );
}