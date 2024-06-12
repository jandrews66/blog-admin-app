import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import '../../index.css'

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
        <nav className="bg-slate-400 flex items-center justify-between p-4">
          <ul className="flex space-x-4">
            <li>
              <Link className="text-black hover:underline" to={`/users/${userId}`}>My Posts</Link>
            </li>
            <li>
              <Link className="text-black hover:underline" to="/posts">All Posts</Link>
            </li>
            <li>
              <Link className="text-black hover:underline" to="/posts/create">Create Post</Link>
            </li>
          </ul>
          <button
            className="text-black hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
