const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: "200"
        },
        desc: {
            type: String
        },
        createdAt: {
            type: String,
            default: new Date().toTimeString()

        }
    }
)

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
//default export