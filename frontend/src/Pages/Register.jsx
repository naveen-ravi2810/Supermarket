import React from 'react';

function Register() {

    function handleSubmit(){
        console.log("name");
    }

  return (
    <div className=' min-h-screen bg-gray-200 flex items-center justify-center'>
        <div className=' bg-white rounded-2xl'>
           <div className=''>
                <form className='m-5' onSubmit={handleSubmit}>
                    <div className=' '>
                        <input className='border-2 border-gray-200 m-2 rounded-xl p-2' type="text" placeholder='Enter Name'/>
                    </div>
                    <div className=' '>
                        <input className='border-2 border-gray-200 m-2 rounded-xl p-2' type="email" placeholder='Email'/>
                    </div>
                    <div className=''>
                        <input className='border-2 border-gray-200 m-2 rounded-xl p-2' type="tel" placeholder='Phone'/>
                    </div>
                    <div className=''>
                        <input className='border-2 border-gray-200 m-2 rounded-xl p-2' type="password" placeholder='Password' />
                    </div>
                    <div className=''>
                        <input className='border-2 border-gray-200 m-2 rounded-xl p-2' type="password" placeholder='Repeat Password'/>
                    </div>
                    <div className=''>
                         <button className='text-2xl font-semibold border-2 bg-yellow-500 hover:bg-yellow-700 text-white w-full rounded-xl p-2 h-auto'>Sign Up</button>
                    </div>
                </form>
           </div>
        </div>
    </div>
  )
}

export default Register