import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../store/store";
import { getUser } from "../features/account/accountSlice";
import { getCart } from "../features/cart/cartSlice";
import { Header } from "./Header";

//import { useCartContext } from "../context/CartContext";

function App() {

  const dispatch=useAppDispatch();
  //const {setCart}=useCartContext();
  const [loading,setLoading]=useState<boolean>(true);

  const initApp= async()=>{
    await dispatch(getUser());
    await dispatch(getCart());
   
  }

  useEffect(()=>{
  initApp().then(()=> setLoading(false));
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

