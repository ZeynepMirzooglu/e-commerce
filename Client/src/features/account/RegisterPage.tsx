import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import { router } from "../../router/Routes";
import requests from "../../api/request";
import { toast } from "react-toastify";
export default function RegisterPage() {

    const navigate=useNavigate();
    const {register,handleSubmit,setError,formState:{errors,isSubmitting,isValid}}=useForm({
        defaultValues:{
            username:"",
            password:"",
            name:"",
            email:""
        },
        mode:"onTouched"
    });
    async function onSubmit(data:FieldValues){
        requests.Account.register(data).then(()=>{
            toast.success("User registered successfully")
            navigate("/login")
        }).catch(result=>{
            const {data:errors} =result;
            errors.forEach((error:any) => {
                if(error.code == "DuplicateUserName"){
                    setError("username",{message:error.description})
                }
                else if(error.code == "DuplicateEmail"){
                    setError("email",{message:error.description})
                }
            });
        });
        
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 2, marginTop:8}}>
                <Avatar sx={{mx:"auto", mb: 2, bgcolor: 'primary.main', textAlign: 'center'}}>
                    <LockOutlined />
                </Avatar>
            <Typography component="h1" variant="h5" align="center" sx={{textAlign: 'center'}}>
                Register   
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt:2}}>
                <TextField {...register("username",{required:"Username is required",minLength:{
                    value:6,
                    message:"Username must be at least 6 characters long"
                }})} 
                label="Enter username" 
                fullWidth
                autoFocus 
                sx={{mb:2}} 
                size="small"
                error={!!errors.username}
                helperText={errors.username?.message}></TextField>
                <TextField {...register("name",{required:"Name is required",minLength:{
                    value:6,
                    message:"Name must be at least 6 characters long"
                }})} 
                label="Enter Name" 
                fullWidth 
                sx={{mb:2}} 
                size="small"
                error={!!errors.name}
                helperText={errors.name?.message}></TextField>
                <TextField {...register("email",{
                    required:"Email is required",
                    pattern: {
                        value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message:"Invalid email address"
                    }
                })} 
                label="Enter Email" 
                fullWidth 
                sx={{mb:2}} 
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}></TextField>
                <TextField {...register("password",{required:"Password is required",minLength:{
                    value:6,
                    message:"Password must be at least 6 characters long"
                }})} label="Enter password" fullWidth type="password"  
                sx={{mb:2}}
                size="small" 
                error={!!errors.password}
                helperText={errors.password?.message}></TextField>
                <LoadingButton 
                loading={isSubmitting} 
                disabled={!isValid || isSubmitting}
                type="submit" 
                variant="contained" 
                fullWidth sx={{mb:2,mt:2}}>
                    Register  
                </LoadingButton>
                <LoadingButton variant="text" fullWidth sx={{mb:2,mt:2}} onClick={() =>router.navigate("/login")}>
                    Login
                </LoadingButton>
            </Box>
            </Paper>

        </Container>
    );
}