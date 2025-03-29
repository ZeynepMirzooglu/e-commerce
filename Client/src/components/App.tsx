
import { Header } from "./Header";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <CssBaseline/>
    <Header/>
    <Container> <Outlet/></Container>
  </>
  )
}
export default App
