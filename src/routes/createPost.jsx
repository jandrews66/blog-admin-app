import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreatePost(){
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    let { userId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const postData = { title: postTitle, content: postContent }; 
    
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
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
          <input
            type="textarea"
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