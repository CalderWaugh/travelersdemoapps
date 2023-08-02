import './App.css';
import Home from './components/Home';
import Checkoutpage from './components/Checkoutpage';
import Cart from './components/Cart';
import Product from './components/Product';
import Category from './components/Category';
import Searchresult from './components/Searchresult';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/checkout' element={<Checkoutpage/>}/>
        <Route path='/searchresult' element={<Searchresult/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
