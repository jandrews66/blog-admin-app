import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AllPosts from './allPosts'


const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let { userId } = useParams();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        }
      };
  
      fetchUserData();
    }, [userId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    const postList = userData.posts.map(post => (
      <li key={post._id} className="bg-white p-6 border-2 border-slate-300 rounded-xl shadow-md max-w-md mx-auto">
        <Link to={`/posts/${post._id}`} className="text-xl font-semibold text-blue-500 hover:underline">
          {post.title}
        </Link>        
        <p className="text-gray-700 mt-2">{post.content}</p>
      </li>
    ));

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">User Dashboard</h1>
        {userData && (
          <div>
            <p className="text-xl font-semibold text-center py-6">Hello {userData.user.first_name}</p>
          </div>
        )}
        <ul className="space-y-4">
          {postList}
        </ul>
      </div>
    );
  };
  
  export default UserDashboard;