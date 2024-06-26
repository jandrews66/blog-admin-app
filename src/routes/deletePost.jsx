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

      const response = await fetch(`https://dazzling-elemental-airplane.glitch.me/posts/${postId}`, {
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
    <div className="container mx-auto px-8 py-8">
      <div className="bg-white p-6 border-2 border-slate-300 rounded-xl shadow-md mx-auto max-w-fit">
        <p className="py-4">Are you sure you want to delete this post?</p>
        <div className="flex justify-evenly py-2">
          <button 
            className="border-2 border-slate-300 hover:bg-slate-300 text-slate-600 font-bold py-2 px-4 rounded"

            onClick={() => navigate(-1)}>Go Back
            </button>
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}>Confirm
          </button>
        </div>

      </div>

    </div>
  );
}
