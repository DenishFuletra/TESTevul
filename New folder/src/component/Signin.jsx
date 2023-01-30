import React from 'react'
import { useState } from 'react'
import { addUserData } from '../api/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const navigate = useNavigate();
    let [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    let setUserData = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }
    let addUser = async () => {
        let responce = await addUserData(user);
        toast('Registration successful', {
            type: 'success',
        })
        console.log(responce.data.message);
        if (responce.data.message === "Registration Succesful") {
            navigate("/login");


        }
    }

    return (
        <div id='login-form'>
            <input type="text" name='name' onChange={(e) => { setUserData(e) }} placeholder='Enter the Name' />
            <input type="text" name='email' onChange={(e) => { setUserData(e) }} placeholder='Enter the Username' />
            <input type="password" name='password' onChange={(e) => { setUserData(e) }} placeholder='Enter the Password' />
            <button onClick={() => { addUser() }}>Log in</button>
        </div>
    )
}
