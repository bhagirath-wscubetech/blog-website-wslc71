import React, { useEffect, useState } from 'react'
import Apis from '../../apis';
export default function Add() {
    const [msg, setMsg] = useState("");
    const [flag, setFlag] = useState(0);
    const [token, setToken] = useState("");
    // 0: error 1: success
    const submitForm = (event) => {
        setMsg("");
        event.preventDefault();
        const data = {
            title: event.target.title.value,
            desc: event.target.description.value
        }
        const response = new Apis().addBlog(data,token)
        response.then(
            (success) => {
                // console.log(success)
                setMsg(success.data.msg)
                if (success.data.status == 1) {
                    event.target.reset();
                    setFlag(1);
                } else {
                    setFlag(0);
                }
            }
        ).catch(
            (error) => {
                setMsg(error.data.msg)
                setFlag(0);
            }
        )
    }

    useEffect(
        () => {
            let token = localStorage.getItem("token");
            if (token == undefined) {
                token = "";
            }
            setToken(token);
        },
        []
    )

    return (
        <div className='max-w-[600px] mx-auto px-[12px]'>
            <div className='shadow rounded-md w-full p-2 mt-10'>
                <h2 className='text-[30px] text-red-500 text-center my-3'>Add Blog</h2>
                <div className={`text-${flag == 1 ? 'lime' : 'red'}-700 my-3 text-[20px]`}>{msg}</div>
                <form action="" noValidate onSubmit={submitForm}>
                    <div className='mt-2'>
                        <label className='font-bold block'>Title</label>
                        <input type="text" className='my-1 rounded border p-2 w-full focus:outline-none' name='title' required />
                    </div>
                    <div className='mt-2'>
                        <label className='font-bold block'>Email</label>
                        <textarea className='my-1 rounded border p-2 w-full focus:outline-none' name="description" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className='mt-2'>
                        <button className='py-2 shadow rounded px-4 bg-red-500 text-white'>Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}