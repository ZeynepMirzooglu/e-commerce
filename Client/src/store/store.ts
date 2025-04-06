import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import cartSlice from "../features/cart/cartSlice";
import catalogSlice from "../features/catalog/catalogSlice";
import accountSlice from "../features/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";



export const store=configureStore({
    reducer:{
        counter:counterSlice,
        cart: cartSlice,
        catalog:catalogSlice,
        account:accountSlice
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector=useSelector.withTypes<RootState>();