import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton,Stack,Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppSelector, useAppDispatch } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";

const links=[
  {title:"Home", path:"/"},
  {title:"Catalog", path:"/catalog"},
  {title:"Contact", path:"/contact"},
  {title:"About", path:"/about"},
  {title:"Error", path:"/error"}, 
]
const authLinks =[
  {title:"Login", path:"/login"},
  {title:"Register", path:"/register"},
]

const navStyles={
  color:"inherit",
  textDecoration:"none",
  "&:hover":{
    color:"primary.dark"
  },
  "&.active":{
    color:"primary.light"}
}
export function Header(){

  const {cart} = useAppSelector(state=>state.cart)
  const user = useAppSelector(state => state.account.user);
  const dispatch =useAppDispatch();
  //const {cart}=useCartContext();
  const count = cart?.cartItems.reduce((total,item)=>total+item.quantity,0);
  
    return (
    <AppBar position="static" sx={{mb:4}}>
      <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
        <Box sx={{display:"flex", alignItems:"center"}}>
        <Typography variant="h6" >E-Commerce</Typography>
      <Stack direction="row" spacing={3}>
        {links.map((link)=>(
          <Button component={NavLink} to={link.path} sx={navStyles}>{link.title}</Button>
        ))
        }
      </Stack>
      </Box>
      <Box sx={{display:"flex", alignItems:"center"}}>
        <IconButton size="large" edge="start" color="inherit" component={Link} to="/cart">
          <Badge badgeContent={count} color="secondary"> <ShoppingCart/></Badge>
        </IconButton>
        {
          user ? (
            <Stack direction="row">
            <Button sx={navStyles}>{user.name}</Button>
            <Button sx={navStyles} onClick={()=>{
              dispatch(logout())
              dispatch(clearCart())
              }}>Log Out</Button>
            </Stack>
          ):(
            <Stack direction="row">
            {authLinks.map((link)=>(
            <Button component={NavLink} to={link.path} sx={navStyles}>{link.title}</Button>))}
          </Stack>
          )
        }       
      </Box>

      </Toolbar>
  </AppBar>
    )
  }