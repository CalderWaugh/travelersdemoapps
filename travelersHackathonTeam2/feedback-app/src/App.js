import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header'
import SignInRegistration from './components/SignInRegistration'
import Home from './components/Home';

const url = 'http://localhost:4000'

function App() {
	const [userState, setUserState] = useState({
		username: '',
		password: '',
		role: 'emp',
		authorized: false
	});

	const handleStateUpdate = (newState) => {
		setUserState({ ...userState, ...newState });
	};

	return (
		<div className="App">
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignInRegistration userState={userState} handleStateUpdate={handleStateUpdate} />}/>
					<Route path="/home" element={<Home userState={userState} />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;