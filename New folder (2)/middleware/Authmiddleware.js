const jwt = require('jsonwebtoken')
const Auth = require('../database/AuthSchema')


async function AuthMiddleware(req, res, next) {
    const authorization = req.headers['authorization'];
    try {
        if (authorization) {
            const token = authorization.split(' ').pop();
            // console.log(token);
            if (token) {
                let secret = "dssds-5454dsdsds"
                try {
                    jwt.verify(token, secret)
                }
                catch (err) {
                    return res.status(401).send({
                        message: "Invalid tokan provided"
                    })
                }

                let user = jwt.decode(token);
                // console.log(user);
                let Nuser = await Auth.findById(user._id)

                //  console.log(Nuser);
                //delete Nuser.password
                const { _id, name, email } = Nuser
                req.user = { _id, name, email }
                // console.log(Nuser);
                next()
            }
            else {
                return res.status(401).send({
                    message: "No auth token present"
                })
            }
        }
        else {
            return res.status(401).send({
                message: 'User is not logged in'
            })
        }
    }
    catch (e) {
        return res.status(401).send({
            message: e.message
        })
    }
}

module.exports = AuthMiddleware;
