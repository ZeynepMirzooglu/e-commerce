import { Box, Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router";

export default function NotFound() {
    const {state} = useLocation();
    return (
       <>
       <Container component={Card} sx={{p:3}}>
       <Typography variant="h5" gutterBottom align="center" color="error">
           {state?.error?.title || "Oops - Not Found"} - {state?.status}
        </Typography>
        <Divider sx={{mb:2}}/>
           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" component={NavLink} to="/catalog">
                    Continue Shopping
                </Button>
            </Box>
        </Container>
       </>
    );
    }