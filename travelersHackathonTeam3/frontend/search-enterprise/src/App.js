import Login from './components/Login.js'
import Register from './components/Register.js'
import Search from './components/Search.js'
import Prediction from './components/Prediction.js'

import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/prediction" element={<Prediction />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
