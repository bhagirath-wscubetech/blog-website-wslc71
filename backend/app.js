const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogRouter = require('./routes/blog.js');
const UserRouter = require('./routes/user.js');
var cors = require('cors')
const PORT = 5000;
const app = express();

app.use(bodyParser.json()); // to parse the json data
app.use(cors());
// routes
app.use('/blog', BlogRouter);
app.use('/user', UserRouter);
// ------


// data connection and server connection
mongoose.connect('mongodb+srv://bhagirathwscube:xjuV5D641hmguIQ6@cluster0.fe0oaxk.mongodb.net/?retryWrites=true&w=majority')
    .then(
        () => {
            console.log('Data base connected');
            app.listen(
                PORT,
                () => {
                    console.log(`The server started`);
                }
            )
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )

