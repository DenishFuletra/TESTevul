import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginData, GetLoggedIn } from "../api/api"
import { toast } from 'react-toastify';
import { loginContext } from '../contex/Contex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';

export default function Login() {
    const { loggedIn, setLoggedIn, loggedUser, setLoggedUser } = useContext(loginContext);

    const navigate = useNavigate();
    let [user, setUser] = useState({
        email: "",
        password: ""
    })

    let setUserData = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    let LoginUser = async () => {
        let responce = await LoginData(user);
        // console.log(responce);
        toast('Login successful', {
            type: 'success',
        })
        if (responce.data.message === "Login successful") {
          //  console.log(responce.data.message);
            localStorage.setItem('user-token', responce.data.data.token)
            setLoggedIn(true);
            navigate("/")

        }
    }
    useEffect(() => {
        let token = localStorage.getItem('user-token');
        // console.log(token);
        var arr = []
        GetLoggedIn(token)
            .then((user) => {
                //console.log(user.data.data)
                arr = user.data.data
                   console.log(arr);

                setLoggedIn(true);
                navigate("/")
            })
        setTimeout(() => {
            setLoggedUser(arr)
        }, 500);


    }, [loggedIn])

console.log(loggedUser);

    return (
        <div id='login-form'>
            <input type="text" name='email' onChange={(e) => { setUserData(e) }} placeholder='Enter the Username' />
            <input type="password" name='password' onChange={(e) => { setUserData(e) }} placeholder='Enter the Password' />
            <button onClick={() => { LoginUser() }} type='submit'>Log in</button>
            <button onClick={() => { navigate('/signin') }} >Sign In</button>
        </div>
    )
}
