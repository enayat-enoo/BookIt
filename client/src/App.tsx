import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Navbar onSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={search} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
