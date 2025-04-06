import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { loginUser } from "./accountSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
export default function LoginPage() {

    const dispatch =useAppDispatch();
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors,isSubmitting,isValid}}=useForm({
        defaultValues:{
            username:"",
            password:""
        }
    });
    async function onSubmit(data:FieldValues){
        await dispatch(loginUser(data));
        navigate("/catalog",{replace:true});
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 2, marginTop:8}}>
                <Avatar sx={{mx:"auto", mb: 2, bgcolor: 'primary.main', textAlign: 'center'}}>
                    <LockOutlined />
                </Avatar>
            <Typography component="h1" variant="h5" align="center" sx={{textAlign: 'center'}}>
                Login   
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt:2}}>
                <TextField {...register("username",{required:"Username is required",minLength:{
                    value:6,
                    message:"Username must be at least 6 characters long"
                }})} 
                label="Enter username" 
                fullWidth required 
                autoFocus 
                sx={{mb:2}} 
                size="small"
                error={!!errors.username}
                helperText={errors.username?.message}></TextField>
                {/* {errors.username && <Typography color="error">{errors.username.message}</Typography>} */}
                <TextField {...register("password",{required:"Password is required",minLength:{
                    value:6,
                    message:"Password must be at least 6 characters long"
                }})} label="Enter password" fullWidth type="password" 
                required 
                sx={{mb:2}}
                size="small" 
                error={!!errors.password}
                helperText={errors.password?.message}></TextField>
                {/* {errors.password && <Typography sx={{mx:"auto"}} color="error">{errors.password.message}</Typography>} */}
                <LoadingButton 
                loading={isSubmitting} 
                disabled={!isValid || isSubmitting}
                type="submit" 
                variant="contained" 
                fullWidth sx={{mb:2,mt:2}}>
                    Login   
                </LoadingButton>
                <LoadingButton variant="text" fullWidth sx={{mb:2,mt:2}} onClick={() => console.log("Register")}>
                    Register
                </LoadingButton>
            </Box>
            </Paper>

        </Container>
    );
}