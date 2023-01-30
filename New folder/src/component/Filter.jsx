import React from 'react'
import { useState } from 'react';

export default function Filter({ data }) {
    let [NewData, setNewData] = useState({
        category: "movie",
        author: ""
    })
    const { setFilter, filter ,GetData} = data;


    let addedFilter = () => {
        setFilter({
            category: NewData.category,
            author: NewData.author
        })
        //GetData();
    }
   // console.log(filter)

    return (
        <div id='filter'>
            <select name="category" id="" onChange={(e) => {
                setNewData({
                    ...NewData, [e.target.name]: e.target.value,
                })
            }} >
                <option value="Movie">Movie</option>
                <option value="Food">Food</option>
                <option value="Book">Book</option>
            </select>
            <input type="text" placeholder='Enter the Author name' name='author' onChange={(e) => {
                setNewData({
                    ...NewData, [e.target.name]: e.target.value,
                })
            }} />
            <button onClick={() => { addedFilter() }}>Submit</button>

        </div>
    )
}
