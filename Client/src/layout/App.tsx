
import { Header } from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import requests from "../api/request";
import { useAppDispatch } from "../hooks/hooks";
import { setCart } from "../features/cart/cartSlice";
//import { useCartContext } from "../context/CartContext";

function App() {

  const dispatch=useAppDispatch();
  //const {setCart}=useCartContext();
  const [loading,setLoading]=useState<boolean>(true);

   useEffect(()=>{
    requests.Cart.get()
    .then(cart=>dispatch(setCart(cart)))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false));
   },[])

   if(loading) return <CircularProgress/>
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <CssBaseline/>
    <Header/>
    <Container> <Outlet/></Container>
  </>
  )
}
export default App

