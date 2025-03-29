import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton,Stack,Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";

const links=[
  {title:"Home", path:"/"},
  {title:"Catalog", path:"/catalog"},
  {title:"Contact", path:"/contact"},
  {title:"About", path:"/about"}
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
    return (
    <AppBar position="static" sx={{mb:4}}>
      <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
        <Box sx={{display:"flex", alignItems:"center"}}>
        <Typography variant="h6" >E-Commerce</Typography>
      {/* <List sx={{display:"flex"}}>
        {links.map((link)=>(
          <ListItem  component={NavLink} to={link.path} sx={navStyles}>{link.title}</ListItem>
        ))}
      </List> */}
      <Stack direction="row" spacing={3}>
        {links.map((link)=>(
          <Button component={NavLink} to={link.path} sx={navStyles}>{link.title}</Button>
        ))
        }
      </Stack>
      </Box>
      <Box >
        <IconButton size="large" edge="start" color="inherit">
          <Badge badgeContent="2" color="secondary"> <ShoppingCart/></Badge>
        </IconButton>
      </Box>
      
      </Toolbar>
  </AppBar>
    )
  }