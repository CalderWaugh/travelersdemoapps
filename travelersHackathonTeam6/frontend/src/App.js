import React from "react";
import "./App.css";
// import "./site.css";
// import Header from "./components/Header";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Employee from "./components/Pages/Employee";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;