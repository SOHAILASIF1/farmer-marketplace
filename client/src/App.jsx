import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import SIgnup from "./pages/SIgnup";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/new" element={<AddProduct/>}/>
          <Route path="/signup" element={<SIgnup />} />
         <Route path="/my-products" element={<MyProducts/>}/>
          
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<ProductDetail/>}/>
          <Route path="/products/:id/edit" element={<EditProduct/>}/>

        </Routes>
      </main>
      <Footer />
    </div>
  );
}