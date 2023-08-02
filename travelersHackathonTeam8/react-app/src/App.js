import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Home from './components/home';
import Project from './components/project';
import Login from './components/login';
import Registration from './components/register';
import { Route,Routes } from 'react-router-dom';


function App() {
  return (
    <div>
          <Routes>
            <Route exact path ="/" element= {<Login/>}/>
            <Route path ="/Home/:_id" element= {<Home/>}/>
            <Route path ="/Project/:projectId" element= {<Project/>}/>
            <Route path = "/Login" element = {<Login/>}/>
            <Route path = "/Register" element = {<Registration/>}/>
        </Routes>
    </div>
  );
}

export default App;
