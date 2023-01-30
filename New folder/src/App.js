import './App.css';
import Login from './component/Login';
import Home from './component/Home';
import Signin from './component/Signin';
import Navbar from './component/Navbar';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginContext } from './contex/Contex';
import { useState, useEffect } from 'react';
import { GetLoggedIn } from "./api/api"
import CreateBlog from './Blog Component/CreateBlog';
import EditBlog from './Blog Component/EditBlog';



function App() {
  const navigate = useNavigate();
  let [loggedIn, setLoggedIn] = useState(false);
  let [loggedUser, setLoggedUser] = useState([]);
  let [filter, setFilter] = useState({
    category: "",
    author: ""
  })


  useEffect(() => {
    let token = localStorage.getItem('user-token');
    // console.log(token);
    var arr = []
    GetLoggedIn(token)
      .then((user) => {
        // console.log(user.data.data)
        arr = user.data.data
       /// console.log(arr);

        setLoggedIn(true);
        navigate("/")
      })
    setTimeout(() => {
      setLoggedUser(arr)
    }, 500);


  }, [loggedIn])

 //console.log(loggedUser);


  return (
    <div className="App">
      <loginContext.Provider value={{ loggedIn, setLoggedIn, loggedUser, setLoggedUser, filter, setFilter }}>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createblog" element={loggedIn ? <CreateBlog /> : <Navigate to="/login" />} />
          <Route path="/updateblog/:id" element={<EditBlog />} />
        </Routes>
      </loginContext.Provider>

    </div>
  );
}

export default App;
