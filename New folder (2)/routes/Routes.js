const express = require('express');

const { Register, Login, GetLoggedIn } = require('../controller/AuthController');
const { AddBlogData, GetBlogData, DeleteBlogData, GetBlogDataById,UpdateBlogData } = require('../controller/BlogController');
const AuthMiddleware = require('../middleware/Authmiddleware');
const app = express();
const router = express.Router();

router.post('/register', Register)
router.post('/login', Login)
router.get('/getloggedin', AuthMiddleware, GetLoggedIn)

router.post('/addblog', AddBlogData)
router.get('/getallblog', GetBlogData)
router.get('/getblog/:id', GetBlogDataById)
router.delete('/deleteblog/:id', DeleteBlogData)
router.patch('/updateblog/:id', UpdateBlogData)


module.exports = router;

