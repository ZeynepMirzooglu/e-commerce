import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/IUser";
import { FieldValues } from "react-hook-form";
import requests from "../../api/request";
import { router } from "../../router/Routes";

interface AcoountState{
  user:User | null;
}

const initializeState: AcoountState = {
    user: null
}

export const loginUser= createAsyncThunk<User,FieldValues>(
    "account/login",
    async (formData,{rejectWithValue})=>{
        try {
            const user = await requests.Account.login(formData);
            localStorage.setItem("jwt",JSON.stringify(user));
           // localStorage.setItem("username",user.name);
            return user;
        } catch (error:any) {
            return rejectWithValue({error:error.data});
        }
    }
)
export const getUser= createAsyncThunk<User>(
    "account/getUser",
    async(_,thunkAPI)=>{
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("jwt")!)))
        try {
            const user= await requests.Account.getUser();
            localStorage.setItem("jwt",JSON.stringify(user));
            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data});
        }
    },
    {
        condition:()=>{
            if(!localStorage.getItem("jwt")) return false;
        }
    }
)
export const accountSlice = createSlice({
    name:"account",
    initialState:initializeState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            localStorage.removeItem("jwt");
            //localStorage.removeItem("username");
            router.navigate("/login",{replace:true});
        },
        setUser:(state,action)=>{
            state.user =action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.user=action.payload;
        })
        builder.addCase(loginUser.rejected,(_,action)=>{
            console.log(action.payload);
        })
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.user=action.payload;
        })
        builder.addCase(getUser.rejected,(state)=>{
            state.user=null;
            localStorage.removeItem("jwt");
            router.navigate("/login",{replace:true});
        })
    }
})


export const {logout,setUser} =accountSlice.actions;
export default accountSlice.reducer;