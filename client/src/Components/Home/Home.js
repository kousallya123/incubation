import React, { useContext } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import startUp from '../../assets/home.webp'
import { UserContext } from '../../Store/UserContext'
import { ApplicationContext } from '../../Store/ApplicationContext'
import { useNavigate } from 'react-router-dom'

function Home() {
  const Navigate= useNavigate()
  const logout = () => {
    alert('Are your sure want to logout!!')
    localStorage.removeItem('user');
    setUserDetails(null)
    removeCookie("jwt");
    Navigate("/login");
    };
  const {setUserDetails, userDetails, removeCookie}=useContext(UserContext)
  const {setApplicationDetails, ApplicationDetails}=useContext(ApplicationContext)
  console.log(userDetails);
  console.log('Application details');
  console.log(ApplicationDetails);
  return (
    <div className='home'>
      <div className='flex justify-end p-3'>
        {userDetails ?
      <button onClick={logout} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>: 
      <Link to='/login'><button  type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login</button></Link>
    }
      </div>
     <h1 className='text-3xl text-purple-600 font-bold m-1'> {userDetails ? `Hey,Welcome ${userDetails.name}`:'Welcome Entrepreneurs'}!</h1> 
      <h3 className='text-xl m-5'>Share your Million dollar Ideas!</h3>
      { ApplicationDetails ?
      <div>
    <h1>Already applied</h1>    
     </div>:
      <div>
          <Link to ='/application'> <button type="button" class="inline-block px-6 py-2.5 m-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Click Here</button></Link>
      <p>For Application Form !</p>
      </div>
     
}
      <div className=' flex  justify-center'>
      <img className='hey ' src={startUp}></img>

      </div>
    </div>
  )
}

export default Home