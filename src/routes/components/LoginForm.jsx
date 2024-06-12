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
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/4 flex flex-col">
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2" >Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button type="submit" className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 px-4 mb-4 max-w-fit">Login</button>
            <p className="text-gray-700">
                Not an author? <Link to={`/signup`} className="text-blue-700">Sign up</Link>
            </p>
            </form>

    </div>

  );
};

export default LoginForm;
