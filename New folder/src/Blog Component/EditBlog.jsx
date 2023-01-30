import React from 'react'
import { useState, useEffect } from 'react'
import { addUserData, getAllBlogDataById, updateBlogDataById } from '../api/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addBlogData } from '../api/api';
import { useParams } from 'react-router-dom';


export default function EditBlog() {
    let navigate = useNavigate();

    let { id } = useParams();
    // console.log(id);

    let [data, setData] = useState({
        Title: '',
        Category: 'Movie',
        Author: '',
        Content: ''
    });



    let addData = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        })
    }


    let updateblogdata = async () => {
        await updateBlogDataById(id, data);
        navigate('/');

    }

    async function getData() {
        let data = await getAllBlogDataById(id);
        console.log(data)

        if (data) {
            setData(data.data);
           // console.log(data)
        }
    }
    useEffect(() => {
        getData();
    }, [])


    //console.log(data)
    return (
        // <div id='create-blog'>
        //     <input type="text" name='Title' onChange={(e) => { addData(e) }} placeholder='Enter the Title'  />
        //     <select name="Category" onChange={(e) => { addData(e) }} id="">
        //         <option value="Movie">Movie</option>
        //         <option value="Food">Food</option>
        //         <option value="Book">Book</option>
        //     </select>
        //     <input type="text" name='Author' onChange={(e) => { addData(e) }} placeholder='Enter the Author' />
        //     <textarea rows="5" onChange={(e) => { addData(e) }} name='Content' className="Text"  />
        //     <button type='submit' onClick={() => { updateblogdata() }}>Update Blog</button>
        // </div>
        <div id='create-blog'>
            <input type="text" name='Title' onChange={(e) => { addData(e) }} placeholder='Enter the Title' value={data.Title} />
            <select name="Category" onChange={(e) => { addData(e) }} id="" value={data.Category}>
                <option value="Movie">Movie</option>
                <option value="Food">Food</option>
                <option value="Book">Book</option>
            </select>
            <input type="text" name='Author' onChange={(e) => { addData(e) }} placeholder='Enter the Author' value={data.Author} />
            <textarea rows="5" onChange={(e) => { addData(e) }} name='Content' className="Text" value={data.Content} />
            <button type='submit' onClick={() => { updateblogdata() }}>Update Blog</button>
        </div>
    )
}
