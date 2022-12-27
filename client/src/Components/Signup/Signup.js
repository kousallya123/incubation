import React from 'react'
import bgImg from '../../assets/lap.jpg'
import { useState } from 'react';
import './Signup.css'
import Axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

export default function Signup() {

    const [name,SetName] = useState('');
    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');
    const [phone,SetPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit =  async (e)=>{
        e.preventDefault()
    try {
        if (!name) {
            setErrorMessage("Name is required");
        } else if (name.length < 3) {
            setErrorMessage("Name must be atleast 3 characters");
        } else if (!name.match(/^[A-Za-z][A-Za-z ]*$/)) {
            setErrorMessage("Enter a valid name");
        } else if (!phone) {
            setErrorMessage("Phone is required");
        } else if (phone.match(/[^0-9]/g)) {
            setErrorMessage("Enter a valid Phone number");
        } else if (phone.length !== 10) {
            setErrorMessage("Phone must be 10 characters");
        } else if (!email) {
            setErrorMessage("Email is required");
        } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
            setErrorMessage("Enter a valid email");
        } else if (!password) {
            setErrorMessage("Password is required");
        } else if (password.length < 4) {
            setErrorMessage("Password must be atleast 4 characters");
        } else if (password.length > 20) {
            setErrorMessage("Password must be less than 20 characters");
        } else {

    const {data} = await Axios.post('http://localhost:5001/SignUp',{
        name:name,
        phone:phone,
        email:email,
        password:password
        });
        console.log(data);
        if (data) {
            if (data?.user) {
                navigate("/login");           
            } else {
                setErrorMessage(data)
            }
        }else{
            setErrorMessage('Something went wrong')
        }
    }
} catch (error) {
    console.log(error.message);
}
}

    
  return (
    <section className='signup'>
        <div className="register kousallya ">
            <div  >
                <h1 className=' text-blue-900 font-bold text-4xl p-8'>Create an Account !</h1>
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                    

                <form onSubmit={handleSubmit}>
                <div className='flex flex-col text-gray-200 py-2'>
                    <label className='text-blue-900 text-bold'>Username</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"  value={name}
            onChange={(e)=>SetName(e.target.value)} />
                </div>
                <div className='flex flex-col text-gray-200 py-2'>
                    <label className='text-blue-900 text-bold'>Contact No:</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"  value={phone}
            onChange={(e)=>SetPhone(e.target.value)} />
                </div>
                <div className='flex flex-col text-gray-200 py-2'>
                    <label className='text-blue-900 text-bold'>Email</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email"  value={email}
            onChange={(e)=>SetEmail(e.target.value)} />
                </div>

                

                
                
                <div className='flex flex-col text-gray-200 py-2'>
                    <label className='text-blue-900 text-bold'>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" value={password}
            onChange={(e)=>SetPassword(e.target.value)} />
                </div>
                
         
              
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGNIN</button>
                <Link className='text-1xl dark:text-blue font-sans ' to="/login"><p>Already a  User ?</p></Link>

                
            </form>

            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    </section>
  )
}