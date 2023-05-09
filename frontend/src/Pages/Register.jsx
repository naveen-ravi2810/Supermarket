import React,{useEffect, useState} from 'react';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setre_Password] = useState('');
    const [error, setError] = useState('');
    
    async function handleSubmit(event) {
        event.preventDefault();
        if (password === re_password) {
                console.log("Fine");
                const response = await fetch('/create_users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, password ,email, phone })
                });
                const data = await response.json();
                if (data.success) {
                        window.location.href='/';
                }
        }
        else {
                setError("The Password Doesn't Match");
        }
                
        }

  return (
    <div className='h-screen bg-gray-200 flex items-center justify-center'>
        <div className=' bg-white rounded-2xl px-10 mx-5'>
           <form onSubmit={handleSubmit}>
                <div className='flex items-center justify-center'>
                        <h1 className='text-5xl mt-5 text-blue-500 font-extrabold'>E-Grocery</h1>
                </div>
                <div className=''>
                        <p>Sign up to see products.</p>
                </div>
                <div className='my-3'>
                        <hr className='w-full my-2  border-gray-200 border-1 dark:bg-gray-700' />
                </div>
                <div className='my-3'>
                        <input className='outline-none border-2 w-full rounded-xl h-10 p-3' type="text" placeholder='Name' onChange={e => setName(e.target.value)} required/>
                </div>
                <div className='my-3'>
                        <input className='outline-none border-2 w-full rounded-xl h-10 p-3' type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className='my-3'>
                        <input className='outline-none border-2 w-full rounded-xl h-10 p-3' type="tel" placeholder='Phone' onChange={e => setPhone(e.target.value)} required/>
                </div>
                <div className='my-3'>
                        <input className='outline-none border-2 w-full rounded-xl h-10 p-3' type="password" placeholder='Passowrd' onChange={e => setPassword(e.target.value)} required/>
                </div>
                <div className='my-3'>
                        <input className='outline-none border-2 w-full rounded-xl h-10 p-3' type="password" placeholder='Re-enter Passowrd' onChange={e => setre_Password(e.target.value)} required/>
                </div>
                <div className='flex justify-center'>
                    {error && <div className='to-black'>{error}</div>}
                  </div>
                <div className='my-3 flex justify-center'>
                        <button type='submit' className='border-2 rounded-xl p-3 cursor-pointer'>Sign up</button>
                </div>
                <div className='flex justify-center px-4'>
                    <div className='w-full'>
                      <hr className="w-full my-3  border-gray-200 border-1 dark:bg-gray-700"/>
                    </div>
                    <div className='mx-3'>
                      <p>or</p>
                    </div>
                    <div className='w-full'>
                      <hr className="my-3  border-gray-200 border-1 dark:bg-gray-700"/>
                    </div>
                  </div>
                  <div className='flex justify-center pb-10 '>
                    <p>Already have an account<a href="/" className='text-blue-500 hover:text-blue-700'> Log in</a></p>
                  </div>
           </form>
        </div>
    </div>
  )
}

export default Register;