import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import cartSlice from "../features/cart/cartSlice";
import catalogSlice from "../features/catalog/catalogSlice";


export const store=configureStore({
    reducer:{
        counter:counterSlice,
        cart: cartSlice,
        catalog:catalogSlice
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;