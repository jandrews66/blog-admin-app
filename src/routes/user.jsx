import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    
    const postList = userData.posts.map(post => <li key={post._id}>{post.title}</li>)
    return (
      <div>
        <h1>User Dashboard</h1>
        {userData && (
          <div>
            <p>Hello {userData.user.first_name}</p>
          </div>
        )}
        {postList}
        <AllPosts />
      </div>
    );
  };
  
  export default UserDashboard;