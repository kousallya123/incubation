import React from 'react'
import { Outlet } from "react-router-dom";
import AdminNavbar from '../Components/Admin/AdminNavbar/AdminNavbar'
import Slots from '../Components/Admin/BookingSlot/Slot'

function slot() {
  return (
    <div>
      <div className="flex">
    <AdminNavbar/>
    <Slots/>


    </div>
    <Outlet/>
    </div>
  )
}

export default slot

