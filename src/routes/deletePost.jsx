import { useParams, useNavigate } from 'react-router-dom';

export default function DeletePost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        console.error('No token found');
        localStorage.removeItem('token');
        navigate('/')
        return;
      }

      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach token to the request
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Post deleted', data);
        // Redirect to posts
        navigate('/posts');
      } else {
        console.log('Post deletion failed', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={handleDelete}>Confirm</button>
    </div>
  );
}