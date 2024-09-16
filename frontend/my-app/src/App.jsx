import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Cards from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/login";
import Register from "./pages/register";
import SweetList from "./pages/sweetList";
import AddProductPage from "./pages/AddProductPage";
import UnauthorizedPage from './pages/UnauthorizedPage'; // Create this page for unauthorized access

function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
    
          <Route path="/" element={<Cards />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SweetList" element={<SweetList />} />
          <Route path="/AddProductPage" element={<AddProductPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />





      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
