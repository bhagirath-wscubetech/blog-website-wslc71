const express = require('express');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const UserRouter = express.Router();

UserRouter.get(
    "/",
    async (req, res) => {
        const users = await User.find();
        res.send(users);
    }
)

UserRouter.post(
    "/",
    (req, res) => {
        const user = new User(
            {
                ...req.body
            }
        )
        user.save()
            .then(
                (success) => {
                    //resolved
                    res.send({ msg: "Data added successfully", status: 1 }).status(200);
                }
            )
            .catch(
                (error) => {
                    //rejected
                    res.send({ msg: "Unable to add the data", status: 0 }).status(500);
                }
            )
    }
)

UserRouter.post(
    "/login",
    async (req, res) => {
        const user = await User.find({
            email: req.body.email,
            password: req.body.password,
        })
        if (user.length == 0) {
            res.send({
                msg: "Invalid credentails",
                status: 0,
                token: ""
            });
        } else {
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + (60),
                    // 60 seconds
                    data: { email: req.body.email, name: user[0].name }
                },
                'wscubetech',
            );
            res.send({
                data: user,
                msg: "User logged In",
                status: 1,
                token
            });
        }
    }
)

// UserRouter.post(
//     "/verify",
//     (req, res) => {
//         const token = req.headers.authorization;
//         try {
//             var decoded = jwt.verify(token, 'wscubetech');
//             console.log(decoded) // bar
//             res.send("Token sahi hai");
//         }
//         catch (err) {
//             res.send("Token gadbad hai");
//         }
//     }
// )

module.exports = UserRouter;