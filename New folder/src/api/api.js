import axios from "axios"

const url = 'https://fair-pear-termite-ring.cyclic.app'

export async function addUserData(data) {
    // console.log(data);
    return await axios.post(`${url}/register`, data);
}

export async function LoginData(data) {
    return await axios.post(`${url}/login`, data);
}

export async function GetLoggedIn(token) {
    return await axios.get(`${url}/getloggedin`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
}

export async function addBlogData(data) {

    return await axios.post(`${url}/addblog`, data);
}
export async function getAllBlogData(category, author) {

    return await axios.get(`${url}/getallblog?category=${category}&author=${author}`);
}
export async function DeleteBlogData(id) {

    return await axios.delete(`${url}/deleteblog/${id}`);
}
export async function getAllBlogDataById(id) {

    return await axios.get(`${url}/getblog/${id}`);
}
export async function updateBlogDataById(id, data) {

    return await axios.patch(`${url}/updateblog/${id}`, data);
}