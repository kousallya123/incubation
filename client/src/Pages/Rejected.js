import React,{useContext,useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import AdminNavbar from '../Components/Admin/AdminNavbar/AdminNavbar'
import Reject from '../Components/Admin/Reject/Reject'


function progress() {
  return (
    <div>
    <div className="flex">
    <AdminNavbar/>
    <Reject/>
    </div>
    <Outlet/>
    </div>
  )
}

export default progress
