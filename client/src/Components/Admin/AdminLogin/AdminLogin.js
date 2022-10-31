import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../../../assets/adminlogin.webp'
import axios from 'axios'
import { UserContext } from '../../../Store/UserContext'
import { useCookies } from 'react-cookie';


export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const {setAdminDetails,adminDetails}=useContext(UserContext)
    const [cookies, setCookie] = useCookies([]);

    const navigate=useNavigate()

    useEffect(() => {
        if(adminDetails){
          navigate('/adminHome')
        }
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email) {
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
               const { data } = await axios.post('http://localhost:5000/admin/login', {
                   email: email,
                   password: password
               });
               if (data) {
                   if (data?.admin) {
                    console.log(adminDetails);
                    console.log(data.admin);
                    console.log(data);
                    setCookie('jwt',data.token);
                     localStorage.setItem('admin', JSON.stringify(data.admin))
                     setAdminDetails(data.admin)
                     console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkk');
                       navigate("/adminHome");           
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
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    <div className='hidden sm:block'>
        <img className='w-full h-full object-cover rounded-md p-4' src={loginImg} alt="" />
    </div>

    <div className='bg-light-500 flex flex-col justify-center'>
        <h1 className='text-blue-800 font-bold text-3xl p-7 text-center'>Hello Admin !</h1>

        <form className='max-w-[400px] w-full h-max mx-auto rounded-lg bg-teal-100 p-8 px-8 '>
            <h2 className='text-4xl text-blue-600 font-extrabold text-center'>LOGIN</h2>
            {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
   
            <div className='flex flex-col text-gray-400 py-2'>
                <label className='text-blue-900 text-bold text-center'>Email</label>
                <input className='rounded-lg bg-blue-300 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" onChange={(e)=> {setEmail(e.target.value)}} />
            </div>
            <div className='flex flex-col text-blue-900 py-2 text-center'>
                <label className=''>Password</label>
                <input className='p-2 rounded-lg bg-blue-300 mt-2 focus:border-blue-500 focus:bg-gray-900 focus:outline-none' type="password" onChange={(e)=> {setPassword(e.target.value)}}  />
            </div>
      
            <button onClick={(e) => handleSubmit(e)} className='w-full my-5 py-2 bg-blue-800 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>LOGIN</button>
           
        </form>
    </div>
</div>
  )
}