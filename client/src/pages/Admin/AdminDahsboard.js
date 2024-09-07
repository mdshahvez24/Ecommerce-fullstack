import React from 'react'
import Lay from './../../components/Layout/Lay';
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../components/context/Auth'

const AdminDahsboard = () => {
  const [auth] = useAuth()
  return (
        <Lay title={"Dashboard - Ecommerce App"}>
      <div className='container-fluid m-3 p-3 dashboard'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          <div className="col-md-9">
          <div className="card w-75 p-3">

            <h3>Admin Name: {auth?.user?.name}</h3>
            <h3>Admin Email: {auth?.user?.email}</h3>
            <h3>Admin Contact :{auth?.user?.phone}</h3>
         </div> 
      </div>
    </div>
  </div>
      </Lay>
  
  )
}

export default AdminDahsboard
