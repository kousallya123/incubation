import React, { useContext, useState } from 'react'
import loginImg from '../../assets/lap.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Store/UserContext'
import axios from 'axios'
import { useCookies } from 'react-cookie';

 export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [cookies, setCookie] = useCookies(['']);
    const {setUserDetails, userDetails}=useContext(UserContext)
    const navigate=useNavigate()

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
              const { data } = await axios.post('http://localhost:5000/login', {
                  email: email,
                  password: password
              });
              if (data) {
                  if (data?.user) {
                    console.log(data)
                    setCookie('jwt',data.token, { path: '/' });
                    localStorage.setItem('user', JSON.stringify(data.user))
                    setUserDetails(data.user)
                      navigate("/");           
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
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full login'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>

        <div className='bg-light-500 flex flex-col justify-center'>
            <h1 className='text-center text-green-700 font-bold text-5xl p-8'>Welcome Buddies !</h1>

            <form className='max-w-[400px] w-full h-max mx-auto rounded-lg bg-green-200 p-8 px-8 '>
                <h2 className='text-4xl text-green-700 font-bold text-center'>LOGIN</h2>
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
       
                <div className='flex flex-col text-gray-400 py-2'>
                    <label className='text-gray-400 text-bold'>Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" onChange={(e)=> {setEmail(e.target.value)}} />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label className=''>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" onChange={(e)=> {setPassword(e.target.value)}} />
                </div>
          
                <button onClick={(e) => handleSubmit(e)} className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGN IN</button>
                <Link className='text-1xl dark:text-white font-sans ' to="/signup"><p>New User ?</p></Link>
               
            </form>
        </div>
    </div>
  )
}