import React, { useState } from 'react'
import { useEffect } from 'react';
import { getAllBlogData, DeleteBlogData } from '../api/api'
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../contex/Contex';
import { useContext } from 'react';
import Filter from './Filter';


export default function Home() {
  const { loggedIn, setLoggedIn, loggedUser, setLoggedUser, filter, setFilter } = useContext(loginContext);


  let navigate = useNavigate();
  let [data, setData] = useState([]);

  async function GetData() {
    let category = filter.category;
    //  console.log(category);
    let author = filter.author;
    let Newdata = await getAllBlogData(category, author);
    // console.log(Newdata.data);
    setData(Newdata.data);
  }

  useEffect(() => {
    GetData();
  }, [filter])

  //console.log(data)
  let DeleteData = async (id) => {
    await DeleteBlogData(id);
    GetData();
  }

  let UpdateData = (id) => {
    //console.log("hi");
    navigate(`/updateblog/${id}`)
  }


  return (
    <>
      <Filter data={{ setFilter, filter, GetData }} />
      <div id='container'>

        {data.map((elem) => {
          return (
            <div id='view-blog'>
              <h4>Title:{elem.Title} </h4>
              <h4>Category:{elem.Category} </h4>
              <h4>Author:{elem.Author} </h4>
              <p>Content:{elem.Content}</p>
              <div id='view-blog-button'>
                <button onClick={() => { UpdateData(elem._id) }} disabled={loggedUser.name !== elem.Author}>Update</button>
                <button onClick={() => { DeleteData(elem._id) }} disabled={loggedUser.name !== elem.Author}>Delete</button>
              </div>
            </div>
          )
        })}
      </div >
    </>
  )
}
