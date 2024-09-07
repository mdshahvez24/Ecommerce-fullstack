import React from 'react'
import Lay from '../../components/Layout/Lay'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Lay>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
                </div>
                <div className='col-md-9'>
               <h1>All Users</h1>
            </div>
        </div>
        </div>
    </Lay>
  )
}

export default Users
