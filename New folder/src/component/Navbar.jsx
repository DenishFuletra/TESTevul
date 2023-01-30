import React from 'react'
import { Link } from 'react-router-dom'
import { loginContext } from '../contex/Contex';
import { useContext } from 'react';

export default function Navbar() {
    const { loggedIn, setLoggedIn } = useContext(loginContext);
    return (
        <div id='navbar'>
            <Link to="/"> <h4 style={{ color: "white" }}>Home</h4></Link>
            <Link to="/createblog"> <h4 style={{ color: "white" }}>Create Blog</h4></Link>
            <Link to="/login"> <h4 style={{ color: "white" }}>Login</h4></Link>
            <h4 onClick={() => {
                localStorage.removeItem('user-token');
                setLoggedIn(false);
            }}>Logout</h4>
        </div>
    )
}
