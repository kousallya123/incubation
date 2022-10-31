import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../Store/UserContext'
import success from '../../assets/success.webp'
import './Success.css'

function Sucess() {
    
    
    const navigate=useNavigate()
    const {setUserDetails, userDetails, removeCookie}=useContext(UserContext)
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserDetails(null)
        removeCookie("jwt");
        navigate("/login");
        };
 
    const handleHome=()=>{
        navigate('/')
    }
  return (
    <div className='success '>
      <h1  className='text-3xl text-black font-bold ameen1'>Your Application Is Submitted Successfully!</h1><br/><br/>
      <button  onClick={handleHome} type="button" class="inline-block px-6 py-2.5 bg-green-500 text-dark font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"> Back to Home</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button  onClick={handleLogout} type="button" class="inline-block px-6 py-2.5 bg-blue-500 text-dark font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>
      <img src={success} alt="success" className='imageee'></img>
    </div>
  )
}

export default Sucess
