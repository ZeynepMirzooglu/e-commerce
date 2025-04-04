import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import HomePage from "../features/HomePage";
import AboutPage from "../features/AboutPage";
import { ContactPage } from "@mui/icons-material";
import CatalogPage from "../features/catalog/CatalogPage";
import ShoppingCardPage from "../features/cart/ShoppingCardPage";
import ProductDetailsPage from "../features/catalog/ProductDetailsPage";
import ErrorPage from "../features/ErrorPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path:"",element:<HomePage/>},
            {path:"about",element:<AboutPage/>},
            {path:"contact",element:<ContactPage/>},
            {path:"catalog",element:<CatalogPage/>}, 
            {path:"catalog/:id",element:<ProductDetailsPage/>},
            {path:"cart",element:<ShoppingCardPage/>},
            {path:"error",element:<ErrorPage/>},
            {path:"server-error",element:<ServerError/>},
            {path:"not-found",element:<NotFound/>},
            {path:"*",element:<Navigate to="/not-found"/>},
        
        ]
    },
    
]);
