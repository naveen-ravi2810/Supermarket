// import React, {useState} from 'react'

function Navbar() {


  return (
    <nav className='md:flex justify-between md:mt-4 md:mb-4 bg-green-500 md:pt-4 md:pb-4 md:text-xl'>
      <img src="" alt="logo" />
      <h3 className="text-3xl">Market Place</h3>
      <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
      <ul className='flex gap-3 md:px-3 top-[-100%]'>
        <li className='bg-white rounded-full md:px-4 md:py-2'>Dashboard</li>
        <li className='bg-white rounded-full md:px-4 md:py-2'>Products</li>
        <li className='bg-white rounded-full md:px-4 md:py-2'>Your Carts</li>
        <li  className='bg-white rounded-full md:px-4 md:py-2'>Orders</li>
        <li  className='bg-white rounded-full md:px-4 md:py-2'>Logout</li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar