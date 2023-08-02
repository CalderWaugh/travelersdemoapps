import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import {CookiesProvider, useCookies} from 'react-cookie';
///////////////////COMPONENTS////////////////////////////
import EmployeePage from './components/employee'
import LoginPage from './components/login'
import HomePage from './components/home'
import NavBar from './components/navbar'
import Directory from './components/directory'
import AboutPage from './components/about'
import Results from './components/search'
///////////////////COMPONENTS////////////////////////////

function App() {
  const [cookies, setCookies] = useCookies(["user", "role", "id"]);

  function handleUser(user, role){
    setCookies("user", user, {path: "/"});
    setCookies("role", role, {path:"/"});
  }
  return (
    <CookiesProvider>
      <div >
        <NavBar/>
        <Routes>
          <Route path="/home" element={<HomePage user = {cookies.user}/>}></Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/login" element={<LoginPage login = {handleUser}/>}></Route>
          <Route path="/directory" element={<Directory />}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/employee/:query" element={<EmployeePage />}></Route>
          <Route path="/search/:query" element={<Results user = {cookies.user}/>}></Route>
          <Route path="*" element={<h1>If you are seeing this, Something went horribly wrong</h1>}></Route>
        </Routes>
      </div>
    </CookiesProvider>
  );
}

export default App;
