import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
      <>
        <div className='mx-auto bg-gray-800'>
            <Outlet/>
        </div>
    </>
  )
}

export default AuthLayout