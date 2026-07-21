import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <>
      <div className='w-full h-screen flex'>
        <div>
          <Navbar />
        </div>
        <div className='w-full h-full overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default RootLayout
