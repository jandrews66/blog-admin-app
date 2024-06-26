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
        const response = await fetch(`https://dazzling-elemental-airplane.glitch.me/users/${userId}`);
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
      <li key={post._id} className="bg-white p-6 border-2 border-slate-300 rounded-xl shadow-md w-full sm:w-full md:w-1/2 lg:w-1/2 max-w-[350px]">
        <Link to={`/posts/${post._id}`} className="text-xl font-semibold text-blue-500 hover:underline">
          {post.title}
        </Link>
        {post.img && (
                        <img 
                          src={post.img} 
                          alt={post.title} 
                          className="w-full mt-4 rounded-md"
                        />
                      )}      
        <p className="text-gray-700 mt-2 line-clamp-5">{post.content}</p>
              <p className={`mt-4 ${post.isPublished ? 'text-green-500' : 'text-red-500'}`}>
                {post.isPublished ? 'Published' : 'Unpublished'}
              </p>
      </li>
    ));

    return (
      <div className="container mx-auto px-8 py-8 max-w-[1000px] ">
        <h1 className="text-3xl font-bold mb-4 text-center">User Dashboard</h1>
        {userData && (
          <div>
            <p className="text-xl font-semibold text-center py-6">Hello {userData.user.first_name}</p>
          </div>
        )}
        <ul className="flex flex-wrap justify-center -mx-4 gap-5">
          {postList}
        </ul>
      </div>
    );
  };
  
  export default UserDashboard;