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
    <div>
      <title>Login</title>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Log In</button>
      {error && <div>{error}</div>}
    </form>
    </div>
  );
}

export default Login