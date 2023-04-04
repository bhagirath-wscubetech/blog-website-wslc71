const Blog = require("../model/blog.js");

class BlogController {
    getData = async (id) => {
        return new Promise(
            async (resolve, rejected) => {
                try {
                    if (id !== undefined) {
                        let data = await Blog.findById(id);
                        if (data == null) {
                            rejected({
                                status: 0,
                                msg: "Data not found"
                            });
                        } else {
                            resolve({
                                status: 1,
                                blogs: data
                            });
                        }

                    } else {
                        let data = await Blog.find();
                        resolve({
                            status: 1,
                            blogs: data,
                            msg: `Total ${data.length} records found`
                        });
                    }
                }
                catch (err) {
                    rejected({
                        status: 0,
                        msg: "Interal server error"
                    });
                }
            }
        )
    }

    createBlog = (data) => {
        return new Promise(
            (resolve, reject) => {
                try {
                    const blog = new Blog(
                        {
                            title: data.title,
                            desc: data.desc,
                        }
                    )
                    blog.save()
                        .then(
                            (success) => {
                                resolve({
                                    msg: "Data added successfully",
                                    status: 1
                                })
                            }
                        )
                        .catch(
                            (error) => {
                                reject({
                                    msg: "Unable to add data",
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    deleteBlog = (id) => {
        return new Promise(
            (resolve, reject) => {
                try {
                    if (id !== undefined) {
                        Blog.deleteOne({
                            _id: id
                        })
                            .then(
                                (success) => {
                                    resolve({
                                        msg: "Data deleted successfully",
                                        status: 1
                                    })
                                }
                            )
                            .catch(
                                (error) => {
                                    reject({
                                        msg: "Unable to delete the data",
                                        status: 0
                                    })
                                }
                            )
                    } else {
                        reject({
                            msg: "The id cannot be null or undefind",
                            status: 0
                        })
                    }
                } catch (err) {
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = { BlogController };