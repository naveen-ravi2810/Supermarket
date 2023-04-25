import { useState } from 'react';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user , setUser] = useState('');
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
      // Redirect to the dashboard
      console.log(data.success)
      setUser(data.user);
      console.log(data.user);
      window.location.href = '/dashboard';
    } else {
      setError(data.message);
    }
  }

  return (
    <div className='absolute top-1/2 left-0 w-full' >
      <title>Login</title>
    <form className="m-auto w-1/2 text-center bg-black" onSubmit={handleSubmit}>
      <label className='block text-white font-bold mb-2 mt-4'>
        Name:
        <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center' type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label className='block text-white font-bold mb-2 mt-4'>
        Password:
        <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center' type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <a href="/" className="flex text-red-500 ml-80">Forgot Password</a>
      <br />
      <button className="block text-center mx-auto bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Log In</button>
      {error && <div>{error}</div>}
    </form>
    </div>
  );
}

export default Login