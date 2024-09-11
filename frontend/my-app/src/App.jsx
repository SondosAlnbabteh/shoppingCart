import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Cards from "./pages/ProductList";
import Cart from "./pages/Cart";
function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
    
          <Route path="/" element={<Cards />} />
          <Route path="/Cart" element={<Cart />} />


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
