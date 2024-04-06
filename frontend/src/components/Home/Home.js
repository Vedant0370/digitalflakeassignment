import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import "./Home.css"
const logo = require("../../assects/logo.jpeg")

const Home = () => {
  return (
    <>
    
    <Sidebar/>
    <div className='container-fluid mt-5'>
  <img src={logo} alt="Digital Flake Logo" className='home-logo'/>

  <p className="text-2xl text-center font-bold"><span className='digital-name'>digital</span><span className='flake2'>flake</span></p>
  <h2 className="text-2xl text-center fs-5">Welcome to digitalflake Admin</h2>
</div>

    
    </>
  )
}

export default Home