import react from 'react';
import './App.css';
import {
  BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import User from './Store/UserContext';
import Application from './Store/ApplicationContext';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home'
import Applicantform from './Components/ApplicantForm/ApplicantForm';
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin';
import AdminHome from './Components/Admin/AdminHome/AdminHome';
import Sucess from './Components/Sucess/Sucess';
import AdminNavbar from './Components/Admin/AdminNavbar/AdminNavbar';
import Approve from './Pages/Approve';
import Reject from './Pages/Rejected'
import Slot from './Pages/Slot';
import Progress from './Pages/Progress';
import CreateSlot from './Pages/CreateSlot'
function App() {
  return (
    <User>
      <Application>
    <Router>
    <Routes> 
      <Route path='/' element={<Home/>}/>  
      <Route path='/login' element={<Login/>}/>  
      <Route path='/Signup' element={<Signup/>}/> 
      <Route path='/application' element={<Applicantform/>}/> 
      </Routes>
      <Routes>
          
      <Route path='/admin/login' element={<AdminLogin/>} />  
      <Route path='/adminHome' element={<AdminHome/>} /> 
      <Route path='/nav' element={<AdminNavbar/>} />  
      <Route path='/approve' element={<Approve/>} />     
      <Route path='/reject' element={<Reject/>} />  
      <Route path='/success' element={<Sucess/>} /> 
      <Route path='/progress' element={<Progress/>} />
      <Route path='/create' element={<CreateSlot/>} />
      <Route path='/slot' element={<Slot/>} />

      </Routes>
   </Router>
   </Application>
   </User>
  );
}

export default App;
