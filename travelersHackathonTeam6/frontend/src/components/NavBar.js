import React from "react";
import { EMPLOYEES_USERNAME_URL } from '../api/urls';
import { ReactComponent as Logo } from './media/address-book-solid.svg';
import './style/NavBar.css'


function NavBar({ loggedInUser, updateUser, handleClickPredict }) {

    function handleClickProfile() {
        if (loggedInUser) {
            let logout = window.confirm(`Logout of user: ${loggedInUser.Username}`);
            if (logout) {
                updateUser(null)
            }
        }
        else {
        let username = prompt("Login with Username")
            if (username) {
                getUser(username)
            }
        }
    }

    async function getUser(username) {
        let res = await fetch(`${EMPLOYEES_USERNAME_URL}/${username}`)
        if (res.status === 404) {
            alert("Invalid username")
        }
        else if (res.status === 200) {
            let userData = await res.json();
            updateUser(userData)
        }

    }

    return (
        <nav className="navbar">
                <h1 className="navbar-logo">
                    <a href="/">Enterprise Directory <Logo className="logo" style={{color: "#ffffff"}}/></a>
                </h1>
                <ul className={'nav-menu'}>
                    <li key={0} onClick={handleClickPredict}>
                        <span className='nav-links'>Predict Salary</span>
                    </li>
                    <li key={1} onClick={handleClickProfile}>
                        <span className='nav-links'>Profile
                        {loggedInUser && <span>: {loggedInUser.Username}</span>}
                        </span>
                    </li>

                </ul>
            </nav>
    )
}

export default NavBar