import React from 'react'
import { Link } from 'react-router-dom'
import "../../style/Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">All right reserverd &copy; Technical</h1>
      <p className='text-center mt-3 '>
        <Link to='/about' className='button-link'>About</Link>
        <Link to='/contact' className='button-link'> Contact Us</Link>
        <Link to='/policy' className='button-link'>Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer
