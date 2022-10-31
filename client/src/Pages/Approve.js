import React,{useContext,useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import AdminNavbar from '../Components/Admin/AdminNavbar/AdminNavbar'
import Approve from '../Components/Admin/Approve/Approve'


function progress() {
  return (
    <div>
      <div className="flex">
    <AdminNavbar/>
    <Approve/>

    </div>
    <Outlet/>
    </div>
  )
}

export default progress
