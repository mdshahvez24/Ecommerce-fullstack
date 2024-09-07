import React from 'react'
import Lay from '../components/Layout/Lay'
import { Link } from 'react-router-dom'

const PagenotFound = () => {
  return (
    <Lay title={'go back- page not found'}>
      <div className='pnf'>

      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-heading'>Oops! Page not Found</h2>
      <Link to="/" className="pnf-btn">
      Go Back
      </Link>
      </div>
    </Lay>
  )
}

export default PagenotFound;
