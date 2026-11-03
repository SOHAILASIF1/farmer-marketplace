import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import SIgnup from "./pages/SIgnup";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SIgnup />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}