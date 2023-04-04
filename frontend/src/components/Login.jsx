import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Apis from '../apis';
export default function Login() {
    const navigator = useNavigate();
    const [msg, setMsg] = useState("");
    const [flag, setFlag] = useState(0);
    // 0: error 1: success
    const submitForm = (event) => {
        setMsg("");
        event.preventDefault();
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        const response = new Apis().loginUser(data)
        response.then(
            (success) => {
                localStorage.setItem("token", success.data.token);
                setMsg(success.data.msg)
                if (success.data.status == 1) {
                    console.log("Hello");
                    event.target.reset();
                    setFlag(1);
                    navigator('/blog/add');
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

    return (
        <div className='max-w-[600px] mx-auto px-[12px]'>
            <div className='shadow rounded-md w-full p-2 mt-10'>
                <h2 className='text-[30px] text-red-500 text-center my-3'>Login!</h2>
                <div className={`text-${flag == 1 ? 'lime' : 'red'}-700 my-3 text-[20px]`}>{msg}</div>
                <form action="" noValidate onSubmit={submitForm}>
                    <div className='mt-2'>
                        <label className='font-bold block'>Email</label>
                        <input type="email" className='my-1 rounded border p-2 w-full focus:outline-none' name='email' required />
                    </div>
                    <div className='mt-2'>
                        <label className='font-bold block'>Password</label>
                        <input type="password" className='my-1 rounded border p-2 w-full focus:outline-none' name='password' required />
                    </div>
                    <div className='mt-2'>
                        <button className='py-2 shadow rounded px-4 bg-red-500 text-white'>Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
