import React,{useContext,useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import AdminNavbar from '../Components/Admin/AdminNavbar/AdminNavbar'
import Progress from '../Components/Admin/Progress/Progress'


function progress() {
  return (
    <div>
      <div className="flex">
    <AdminNavbar/>
    <Progress/>

    </div>
    <Outlet/>
    </div>
  )
}

export default progress
