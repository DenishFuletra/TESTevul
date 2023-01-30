const Auth = require('../database/AuthSchema')
const jwt = require('jsonwebtoken');


function Generatetoken(user) {
    const { _id, name, email } = user;

    let secret = "dssds-5454dsdsds"

    return jwt.sign({
        _id, name, email
    }, secret)

}

async function Register(req, res) {
    try {
        let data = req.body;
        //  console.log(data);
        const { name, email, password } = data;

        let searchData = await Auth.findOne({ email: email });

        if (searchData) {
            res.status(400).send({
                message: "User with this email already exists"
            })
        } else {
            await Auth.create({ name: name, email: email, password: password })
            return res.send({
                message: 'Registration Succesful'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

async function Login(req, res) {
    try {
        let data = req.body;
        //console.log(data);
        const { email, password } = data;
        let searchData = await Auth.findOne({ email: email });
        if (!searchData) {
            return res.status(404).send({
                error: "User with this email does not exist"
            })
        }
        if (searchData.password !== data.password) {
            return res.status(400).send({
                error: 'Wrong password'
            })
        }
//console.log(searchData);
        const token = Generatetoken(searchData)
        const { _id, name } = searchData;
        return res.send({
            message: 'Login successful',
            data: {
                token,
                user: {
                    _id, name
                }
            }
        })
    }
    catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

async function GetLoggedIn(req, res) {
    try {
        const authorization = req.headers['authorization']
        //  console.log(authorization);
        const user = req.user;
        return res.send({
            data: user
        })

    }
    catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    Register,
    Login,
    GetLoggedIn
}