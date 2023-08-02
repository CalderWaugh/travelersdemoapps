import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import "./App.css";
import Home from "./Home.js";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from "./components/Cart.js"
import Navbar from './components/Navbar'
import Search from './components/Search'

function App() {
  const [numCartItems, setNumCartItems] = useState(0)
  return (
    <CookiesProvider>
      <BrowserRouter>
      <Navbar numCartItems={numCartItems} setNumCartItems={setNumCartItems}/>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart setNumCartItems={setNumCartItems}/>}/>
          <Route path="/search" element={<Search numCartItems={numCartItems} setNumCartItems={setNumCartItems}/>} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
