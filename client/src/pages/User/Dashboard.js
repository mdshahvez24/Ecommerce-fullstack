import React from 'react'
import Lay from '../../components/Layout/Lay'
import { useAuth } from '../../components/context/Auth'
import UserMenu from "../../components/Layout/UserMenu"
const Dashboard = () => {
  
  const [auth] = useAuth()

  return (
    <Lay title={"Dashboard - Ecommerce App"}>
       <div className='container-fluid m-3 p-3 dashboard'>
        <div className='row'>
            <div className='col-md-3'>
              <UserMenu/>
            </div>
                <div className='col-md-9'>
                <div className="card w-75 p-3">
                  <h3>{auth?.user?.name}</h3>
                  <h3>{auth?.user?.email}</h3>
                  <h3>{auth?.user?.address}</h3>
                </div>
                </div>
                </div>
                </div>
    </Lay>
  )
}

export default Dashboard;
