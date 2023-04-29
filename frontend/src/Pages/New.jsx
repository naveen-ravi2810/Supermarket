import React from 'react'

function New() {
  return (
    <div className='bg-blue-600 m-0 p-0 min-h-screen'>

        <div className="px-20 py-10 w-full ">
            <div className='border-2 border-white-600 bg-white min-h-screen rounded-3xl'>
                <div id='nav_bar' className='flex justify-between h-full mx-10 my-10'>
                    <div>
                        <ul className='flex'>
                            <li className='mx-5 hover:cursor-pointer font-semibold'>Home</li>
                            <li className='mx-5 hover:cursor-pointer font-semibold'>About</li>
                            <li className='mx-5 hover:cursor-pointer font-semibold'>Blog</li>
                            <li className='mx-5 hover:cursor-pointer font-semibold'>Pages</li>
                            <li className='mx-5 hover:cursor-pointer font-semibold'>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <ul className='flex '>
                            <li className='mx-5 hover:underline hover:text-blue-500 font-semibold'><a href="/">English</a></li>
                            <li className='mx-5 hover:underline hover:text-blue-500 font-semibold'><a href="/">Sign in</a></li>
                            <li className='mx-5 hover:underline hover:text-blue-500 px-3 border-2 rounded-3xl bg-white font-semibold'><a href="/">Register</a></li>
                        </ul>
                    </div>
                </div>
                <div className='flex h-auto justify-between mx-16 mt-52'>
                    <div className='pl-14'>
                        <h1 className="text-3xl">
                            Sign in to Recharge Directly
                        </h1>
                        <p className="font-semibold">
                            If you don't have an Account you can <a href="/" className='text-blue-400'>Register Here</a>
                        </p>
                    </div>
                    <div className='h-14'>
                        <img className='h-14' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="" />
                    </div>
                    <div>
                        <form>
                            <div>
                                <input type="text" placeholder='Enter Email' className='bg-gray-200 h-12 rounded-xl border-gray-600 m-1.5 pl-5 font-semibold' />
                            </div>
                            <div>
                                <input type="password" placeholder='Password' className='bg-gray-200 h-12 rounded-xl border-gray-600 m-1.5 pl-5 font-semibold'/>
                            </div>
                            <div className='text-gray-400 flex justify-end'>
                                <a href="/" >Forgotten Password</a>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button className='flex border-2 justify-between rounded-xl px-16'>Sign in</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default New