import React from 'react'
import { Outlet } from "react-router-dom";
import AdminNavbar from '../Components/Admin/AdminNavbar/AdminNavbar'
import CreateSlots from '../Components/Admin/BookingSlot/CreateSlot';

function CreateSlot() {
  return (
    <div>
      
<div className="flex">
    <AdminNavbar/>
    <CreateSlots/>
    </div>
    <Outlet/>
    </div>
  )
}

export default CreateSlot

