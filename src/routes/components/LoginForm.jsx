import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false)
        }
        setLoading(false);
    }, []);

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

        setIsAuthenticated(true)
        navigate(`/users/${data.user._id}`)

        } else {
        // Handle login error
        console.log('Login failed', data);
        }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false)
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>; // Show 'loading' while checking authentication status
  }

  return (
    <div>
        {isAuthenticated ? (
            <div>
                <p>You are already logged in</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
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
            
        )}

    </div>

  );
};

export default LoginForm;
