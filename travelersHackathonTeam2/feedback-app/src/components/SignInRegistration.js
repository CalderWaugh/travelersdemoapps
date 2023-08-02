import React, {useState} from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";

const url = 'http://localhost:4000'

function SignInRegistration({ userState, handleStateUpdate }) {
	const { username, password, role, authorized } = userState;
	const [regStatus, setRegStatus] = useState(0); // Display codes: 0-nothing, 1-success, 2-failed 
	const [signInStatus, setSignInStatus] = useState(0); // Display codes: 0-nothing, 1-success, 2-failed 

	let navigate = useNavigate();

	const handleRegister = async () => {
		try {
			const res = await fetch(url + '/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password, role })
			});
			if (!res.ok) {
				setSignInStatus(0);
				setRegStatus(2);
			} else {
				setSignInStatus(0);
				setRegStatus(1);
				handleStateUpdate({ role });
			}
			const data = await res.json();
			console.log(data.message);
		} catch (err) {
			console.error(err);
		}
	}

	const handleSignIn = async () => {
		try {
			const res = await fetch(url + '/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});
			const data = await res.json();
			if (!res.ok) {
				setRegStatus(0)
				setSignInStatus(2);
				handleStateUpdate({ authorized: false });
			} else {
				setRegStatus(0)
				setSignInStatus(1);
				handleStateUpdate({ authorized: true, role: data.user.role });
				signInNav();
			}
			console.log(data.message);
		} catch (err) {
			console.error(err);
		}
	}

	function signInNav() {
		navigate('/home');
	}

	return (
		<div className="form-block">
			{signInStatus === 1 && <p className={'success'}>Signed in successfully!</p>}
			{signInStatus === 2 && <p className={'failed'}>Invalid credentials, please try again.</p>}
			{regStatus === 1 && <p className={'success'}>Registered sucessfully!</p>}
			{regStatus === 2 && <p className={'failed'}>Registration failed, username must be unique.</p>}
			<input
				className="input-field"
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => handleStateUpdate({ username: e.target.value })}
			/>
			<input
				className="input-field"
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => handleStateUpdate({ password: e.target.value })}
			/>
			<select
				className='dropdown'
				value={role}
				onChange={(e) => handleStateUpdate({ role: e.target.value })}
			>
				<option value='emp'>Employee</option>
				<option value='man'>Manager</option>
			</select>
			<button className="button" onClick={handleSignIn}>SIGN IN</button>
			<button className="button" onClick={handleRegister}>REGISTER</button>
		</div>
	);
}

export default SignInRegistration;