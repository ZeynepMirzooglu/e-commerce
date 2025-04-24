import { KeyboardArrowDown, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton,Menu,MenuItem,Stack,Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppSelector, useAppDispatch } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";
import { useState } from "react";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  
    return (
    <AppBar position="static" sx={{mb:4}}>
      <Container maxWidth="lg">
      <Toolbar disableGutters sx={{display:"flex", justifyContent:"space-between"}}>
        <Box sx={{display:"flex", alignItems:"center"}}>
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
            <>
            <Button id="user-button" onClick={handleMenuClick} endIcon={<KeyboardArrowDown/>} sx={navStyles}>{user.name}</Button>
              <Menu id="user-id" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem component={Link} to="/orders">Orders</MenuItem>
                <MenuItem onClick={()=>{
                dispatch(logout())
                dispatch(clearCart())
                }}>Logout</MenuItem>
              </Menu>
            </>
          ):(
            <Stack direction="row">
            {authLinks.map((link)=>(
            <Button component={NavLink} to={link.path} sx={navStyles}>{link.title}</Button>))}
          </Stack>
          )
        }       
      </Box>

      </Toolbar>
      </Container>
  </AppBar>
    )
  }