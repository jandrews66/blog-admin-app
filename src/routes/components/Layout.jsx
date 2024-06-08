import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';

const Layout = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId(null);
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div>
      {userId === null ? (
        <LoginForm setUserId={setUserId} />
    ) : (
        <nav>
          <ul>
            <li>
              <Link to={`/users/${userId}`}>My Posts</Link>
            </li>
            <li>
              <Link to="/posts">All Posts</Link>
            </li>
            <li>
              <Link to="/posts/create">Create Post</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
