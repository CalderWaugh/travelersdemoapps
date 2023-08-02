import React, {useEffect, useState} from "react";
import {useParams, NavLink} from 'react-router-dom';
import {useCookies} from 'react-cookie';

function NavBar(){
    const [cookies, setCookie] = useCookies();
    return(
        <nav className={"navbar"}>
            <NavLink to='/Home' >Home </NavLink>
            <NavLink to='/login' >Login </NavLink>
            <NavLink to='/Directory' >Directory </NavLink>
            <NavLink to='/about' >About </NavLink>
            {(cookies.id? <span style = {{float:"right"}}>Welcome <NavLink to = {`/employee/${cookies.id}`}> {cookies.user}!</NavLink></span> : null)}
        </nav>
    )
}

export default NavBar;