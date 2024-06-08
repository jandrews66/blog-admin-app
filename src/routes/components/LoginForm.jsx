import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = ({ setUserId }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = { username, password };

        const response = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
        // Handle successful login
        console.log('Login successful', data);
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user._id)
        setUserId(data.user._id); // Update the userId in the parent component
        navigate(`/users/${data.user._id}`)

        } else {
        // Handle login error
        console.log('Login failed', data);
        }
  };

/*   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false)
    navigate('/')
  } */


  return (
    <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Login</button>
            <p>
                Not an author? <Link to={`/signup`}>Sign up</Link>
            </p>
            </form>

    </div>

  );
};

export default LoginForm;
