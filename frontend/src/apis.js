import axios from "axios"
const baseUrl = "http://localhost:5000";
class Apis {
    registerUser = (data) => {
        return new Promise(
            (resolve, reject) => {
                axios.post(
                    `${baseUrl}/user`,
                    {
                        ...data
                    }
                )
                    .then(
                        (success) => {
                            resolve(success);
                        }
                    )
                    .catch(
                        (error) => {
                            reject(error);
                        }
                    )
            }
        )
    }
    loginUser = (data) => {
        return new Promise(
            (resolve, reject) => {
                axios.post(
                    `${baseUrl}/user/login`,
                    {
                        ...data
                    }
                )
                    .then(
                        (success) => {
                            resolve(success);
                        }
                    )
                    .catch(
                        (error) => {
                            reject(error);
                        }
                    )
            }
        )
    }
    addBlog = (data, token) => {
        return new Promise(
            (resolve, reject) => {

                axios.post(
                    `${baseUrl}/blog`,
                    {
                        ...data
                    },
                    {
                        headers: {
                            "Authorization": token
                        }
                    }
                )
                    .then(
                        (success) => {
                            resolve(success);
                        }
                    )
                    .catch(
                        (error) => {
                            reject(error);
                        }
                    )
            }
        )
    }
}

export default Apis;