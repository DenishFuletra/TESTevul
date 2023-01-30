import React from 'react'
import { useState } from 'react'
import { addUserData } from '../api/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addBlogData } from '../api/api';
import { loginContext } from '../contex/Contex';
import { useContext } from 'react';

export default function CreateBlog() {
    const { loggedIn, setLoggedIn, loggedUser, setLoggedUser } = useContext(loginContext);
    let [data, setData] = useState({
        Title: '',
        Category: 'Movie',
        Author: loggedUser.name,
        Content: ''
    });

    let addData = (e) => {

        setData({
            ...data, [e.target.name]: e.target.value,
        })
    }
    let addblogdata = async () => {
        await addBlogData(data);
    }
    console.log(loggedUser)
    return (
        <div id='create-blog'>
            <input type="text" name='Title' onChange={(e) => { addData(e) }} placeholder='Enter the Title' />
            <select name="Category" onChange={(e) => { addData(e) }} id="">
                <option value="Movie">Movie</option>
                <option value="Food">Food</option>
                <option value="Book">Book</option>
            </select>
            <input type="text" name='Author' onChange={(e) => { addData(e) }} value={loggedUser.name} placeholder='Enter the Author' />
            <textarea rows="5" onChange={(e) => { addData(e) }} name='Content' className="Text" />
            <button type='submit' onClick={() => { addblogdata() }}>Add Blog</button>
        </div>
    )
}
