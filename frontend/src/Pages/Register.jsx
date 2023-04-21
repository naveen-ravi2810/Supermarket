import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Register() {

    const [username, setUsername] = useState('');
    const [password ,setPassword] = useState('');
    const [error, setError] = useState('');

    // Redirect

    const navigate = useNavigate();

    function LoginPage(){
        navigate('/')
    }

    function handleNameChange(event) {
        setUsername(event.target.value);
    }
    
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/create_users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
        const data = await response.json();
        if (data.success) {
            console.log(data.success)
            window.location.href = `/`;
        } else {
            setError(data.message);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
            </label>
            <input type="text" value={username} onChange={handleNameChange}/>
            <br />

            <label>
                Password:
            </label>
            <input type="password" value={password} onChange={handlePasswordChange}/>
            <br />
            <button type='submit'>Register</button>
            {error && <div>{error}</div>}
        </form>
        <button onClick={LoginPage}>Login</button>
    </div>
  )
}

export default Register