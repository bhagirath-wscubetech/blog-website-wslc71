import React, { useState } from 'react'
import Apis from '../apis';
export default function Register() {
  const [msg, setMsg] = useState("");
  const [flag, setFlag] = useState(0);
  // 0: error 1: success
  const submitForm = (event) => {
    setMsg("");
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      age: event.target.age.value,
      gender: event.target.gender.value,
      contact: event.target.contact.value
    }
    const response = new Apis().registerUser(data)
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

  return (
    <div className='max-w-[600px] mx-auto px-[12px]'>
      <div className='shadow rounded-md w-full p-2 mt-10'>
        <h2 className='text-[30px] text-red-500 text-center my-3'>Register Now!</h2>
        <div className={`text-${flag == 1 ? 'lime' : 'red'}-700 my-3 text-[20px]`}>{msg}</div>
        <form action="" noValidate onSubmit={submitForm}>
          <div className='mt-2'>
            <label className='font-bold block'>Name</label>
            <input type="text" className='my-1 rounded border p-2 w-full focus:outline-none' name='name' required />
          </div>
          <div className='mt-2'>
            <label className='font-bold block'>Email</label>
            <input type="email" className='my-1 rounded border p-2 w-full focus:outline-none' name='email' required />
          </div>
          <div className='mt-2'>
            <label className='font-bold block'>Contact</label>
            <input type="text" className='my-1 rounded border p-2 w-full focus:outline-none' name='contact' required />
          </div>
          <div className='mt-2'>
            <label className='font-bold block'>Age</label>
            <input type="number" className='my-1 rounded border p-2 w-full focus:outline-none' name='age' />
          </div>
          <div className='mt-2'>
            <label className='font-bold block'>Gender</label>
            <div className='flex gap-2 items-center'>
              <label> Male: </label> <input type="radio" value="M" name="gender" id="" required />
              <label> Female: </label> <input type="radio" value="F" name="gender" id="" required />
              <label> Other:</label> <input type="radio" value="O" name="gender" id="" required />
            </div>
          </div>
          <div className='mt-2'>
            <button className='py-2 shadow rounded px-4 bg-red-500 text-white'>Save</button>
          </div>

        </form>
      </div>
    </div>
  )
}
