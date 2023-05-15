import { useState } from 'react';
// import Footer from '../Components/Footer';

function Login() {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState('');
    document.title = "Login";

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    });

    const data = await response.json();
    if (data.success) {
      localStorage.setItem('Token', data.Token);
      sessionStorage.setItem('_e_grocery_Username', data.name);
      window.location.href = '/dashboard';
    } else {
      setError(data.msg);
    }
  }

  function fn_register(){
    window.location.href = '/register';
  }

  return (
      
      <div className='flex h-screen items-center justify-center bg-gray-200 '>
        <div className='md:flex justify-between items-center gap-4'>
          <div className="flex items-center justify-center">
            <div>
                <div>
                <h1 className='text-5xl text-blue-500 font-extrabold pl-10'>E-Grocery</h1>
                </div>
                <div>
                <p className='flex px-10 pt-5 text-xl'>Find the better one to buy Groceries around your region.</p>
                </div>
            </div>
          </div>
          <div className=''>
            <div className="h-auto md:w-96 bg-white rounded-xl m-10 shadow-2xl">
              <div className='flex items-center justify-center'>
                <form onSubmit={handleSubmit}>
                  <div className='flex justify-center pt-5 m-3'>
                    <input type="text" className='border-2 w-full rounded-xl h-14 p-4 outline-none' placeholder='Email address or Phone number' value={name} onChange={handleNameChange}/>
                  </div>
                  <div className='flex justify-center pt-5 mt-3 mx-3'>
                    <input type="password" className='border-2 w-full rounded-xl h-14 p-4 outline-none ' placeholder='Password' value={password} onChange={handlePasswordChange} />
                  </div>
                  <div className='flex justify-end mb-5 mr-3'>
                    <a href="/forgot_password" className='text-blue-500 hover:text-blue-700' >Forgotten password?</a>
                  </div>
                  <div className='flex justify-center'>
                    {error && <div className='to-black'>{error}</div>}
                  </div>
                  <div className='flex w-auto justify-center'>
                    <button className='text-2xl font-semibold border-2 bg-yellow-500 hover:bg-yellow-700 text-white w-full rounded-xl mx-5 h-14' type='submit'>Log in</button>
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
                  <div className='flex justify-center px-6 mx-5 pb-10 '>
                    <p>Don't have an account? <a href="/register" className='text-blue-500 hover:text-blue-700' onClick={fn_register}>Sign up</a></p>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex justify-center'>
              <a href="/" className='font-semibold pr-2 hover:underline'>Be a Seller </a><p> to sell your Produccts here.</p>
            </div>
          </div>
        </div>
        <div className=''>
          {/* <Footer/> */}
        </div>
      </div>
  );
}

export default Login;