import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPost(){
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    let { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
    
            try {
              const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        
              const data = await response.json();
        
              if (response.ok) {
                setPostTitle(data.title)
                setPostContent(data.content)
              } else {
                console.log('update failed', data);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
          getPost();
    }, [postId])

    const handleEdit = async (event) => {
        event.preventDefault();
        const updatedPost = { title: postTitle, content: postContent }

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedPost),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              console.log('Post updated', data);
              navigate(`/posts/${postId}`); 
            } else {
              console.log('Update failed', data);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };

      return (
        <form onSubmit={handleEdit}>
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
        <button type="submit">Save Post</button>
      </form>
      )
}