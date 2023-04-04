const express = require('express')
const BlogRouter = express.Router();
const jwt = require('jsonwebtoken');
const { BlogController } = require('../controllers/blog');
BlogRouter.get(
    "/:id?",
    (req, res) => {
        const token = req.headers.authorization;
        try {
            const ver = jwt.verify(token, 'wscubetech');
            console.log(ver);
            const response = new BlogController().getData(req.params.id);
            response.then(
                (success) => {
                    res.send(success).status(200);
                }
            ).catch(
                (error) => {
                    // console.log(error);
                    res.send(error).status(500);
                }
            )
        }
        catch (err) {
            res.send({
                msg: "Request not authorized",
                status: 0
            }).status(401);
        }

    }
)
BlogRouter.post(
    "/",
    (req, res) => {
        const token = req.headers.authorization;
        try {
            const ver = jwt.verify(token, 'wscubetech');
            console.log(ver);
            const response = new BlogController().createBlog(req.body);
            response.then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
        }
        catch (err) {
            res.send({
                msg: "Request not authorized",
                status: 0
            }).status(401);
        }
    }
)

BlogRouter.delete(
    "/:id",
    (req, res) => {
        const response = new BlogController().deleteBlog(req.params.id);
        response.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)

BlogRouter.post(
    "/update/:id",
    (req, res) => {
        if (req.params.id !== undefined) {
            Blog.findByIdAndUpdate(
                req.params.id,
                { ...req.body }
            ).then(
                (success) => {
                    res.send("data updated successfully");
                }
            )
                .catch(
                    (error) => {
                        res.send("Unable to update the data");
                    }
                )
        }
    }
)
module.exports = BlogRouter;