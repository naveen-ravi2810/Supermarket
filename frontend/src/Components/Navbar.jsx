// import React, {useState} from 'react'

function fn_logout(){
  localStorage.removeItem('Name');
  window.location.href = '/';
}

function fn_product(){
  window.location.href = '/products';
}

function fn_dashboard(){
  window.location.href = '/dashboard';
}

function Navbar() {


  return (
    <nav className="flex bg-orange-500 justify-between">
      {/* The Logo and Name */}
      <div className="flex ml-4 m-2">
        <img className="h-12" src="https://www.albawaba.com/sites/default/files/styles/default/public/im_new/rimshami/egrocery-shutterstock-31May20.jpg?itok=aLHmzdeE" alt="" />
        <h2 className="text-3xl pl-4 text-white">E-Grocery</h2>
      </div>
      {/* The options to be displayed */}
      <div>
        <ul className="flex mt-2 mr-3">
          <li className=' text-white cursor-pointer m-2.5' onClick={fn_dashboard}>Dashboard</li>
          <li className=' text-white cursor-pointer m-2.5' onClick={fn_product}>Products</li>
          <li className=' text-white cursor-pointer m-2.5'>Your Carts</li>
          <li className=' text-white cursor-pointer m-2.5'>Orders</li>
          <li className=' text-white cursor-pointer m-2.5' onClick={fn_logout}>Logout</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar


// <div className="flex h-10">
//       <img className="pl-4" src="https://www.albawaba.com/sites/default/files/styles/default/public/im_new/rimshami/egrocery-shutterstock-31May20.jpg?itok=aLHmzdeE" alt="logo" />
//       <h3 className="text-3xl pl-6">Market Place</h3>
//       </div>
//       <div className="nav-links duration-500 md:static absolute bg-blue-700 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center mx-5">
//       <ul className='flex gap-3 md:px-3 top-[-100%]'>
//         <li className='bg-white rounded-full md:px-4 md:py-2' onClick={fn_dashboard}>Dashboard</li>
//         <li className='bg-white rounded-full md:px-4 md:py-2' onClick={fn_product}>Products</li>
//         <li className='bg-white rounded-full md:px-4 md:py-2'>Your Carts</li>
//         <li  className='bg-white rounded-full md:px-4 md:py-2'>Orders</li>
//         <li  className='bg-white rounded-full md:px-4 md:py-2' onClick={fn_logout}>Logout</li>
//       </ul>
//       </div>