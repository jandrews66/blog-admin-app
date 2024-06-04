import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreatePost(){
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    let userId = localStorage.getItem('userId')
    const navigate = useNavigate();

    useEffect(() => {
      if (!userId) {
        navigate('/login'); // Redirect to login if no userId found
      }
    }, [userId, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const postData = { title: postTitle, content: postContent, user: userId }; 
    
        try {
          const token = localStorage.getItem('token'); // Retrieve token from local storage
          if (!token) {
            console.error('No token found');
            localStorage.removeItem('token');
            navigate('/')
            return;
          }
          const response = await fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Attach token to the request
            },
            body: JSON.stringify(postData),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            console.log('post created', data);
            // redirect to post
            navigate(`/posts/${data._id}`)
          } else {
            console.log('post failed', data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            id="postTitle"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    )
}