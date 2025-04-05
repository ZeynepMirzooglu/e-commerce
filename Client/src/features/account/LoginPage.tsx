import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import requests from "../../api/request";

export default function LoginPage() {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [values, setValues] = useState({
        username: "",   
        password: ""
    });


    function handleSubmit(e:any){
        e.preventDefault();
        console.log("Submit",values);
        requests.Account.login(values).then((res)=>{
            console.log("Login Success",res);
        }).catch((err)=>{
            console.log("Login Error",err);
        })
    }
    function handleInputChange(e:any){
       const {name,value}= e.target;
        setValues({
            ...values,
            [name]: value
        })
        console.log("Input Change",values);
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
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:2}}>
                <TextField name="username" value={values.username} onChange={handleInputChange} label="Enter username" fullWidth required autoFocus sx={{mb:2}} size="small"></TextField>
                <TextField name="password" value={values.password} onChange={handleInputChange} label="Enter password" fullWidth type="password" required sx={{mb:2}}size="small"></TextField>
                <Button type="submit" variant="contained" fullWidth sx={{mb:2,mt:2}}>
                    Login   
                </Button>
                <Button variant="text" fullWidth sx={{mb:2,mt:2}} onClick={() => console.log("Register")}>
                    Register
                </Button>
            </Box>
            </Paper>

        </Container>
    );
}