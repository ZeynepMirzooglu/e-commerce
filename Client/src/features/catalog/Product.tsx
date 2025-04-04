import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";

interface Props{
    product:IProduct
}

export function Product({product}:Props){
  const {status} =useAppSelector(state=>state.cart);
 const dispatch = useAppDispatch()
 
    return (
    <Card>
        <CardMedia sx={{height:160, backgroundSize:"contain"}} image={`http://localhost:5188/images/${product.imageUrl}`}/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color="text.secondary">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">{currencyTRY.format(product.price)}</Typography>
          <CardActions>
            {/* <Button variant="outlined" size="small" startIcon={<AddShoppingCart/>}
            color="success" 
            onClick={()=>handleAddToCart(product.id)} 
            >Add to cart</Button> */}
            <LoadingButton 
            loading={status =="loadingAddItem" + product.id} 
            variant="outlined" 
            loadingPosition="start"
            size="small" 
            startIcon={<AddShoppingCart/>}
            color="success" 
            onClick={()=>dispatch(addItemToCart({productId:product.id}))} 
            >Add to cart</LoadingButton>
            <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon/>} color="primary">View</Button>
          </CardActions>
        </CardContent>
    </Card>
    );
  }