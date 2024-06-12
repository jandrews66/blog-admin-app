import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPost(){
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [isPublished, setIsPublished] = useState(false)
    let { postId } = useParams();
    const navigate = useNavigate();
    let userId = localStorage.getItem('userId')

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
                setIsPublished(data.isPublished)
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
        const updatedPost = { title: postTitle, content: postContent, user: userId, isPublished: isPublished }

        try {
          const token = localStorage.getItem('token'); // Retrieve token from local storage
          if (!token) {
            console.error('No token found');
            localStorage.removeItem('token');
            navigate('/')
            return;
          }
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Attach token to the request
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
    function handlePublished(){
      setIsPublished(!isPublished)
    }

return (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <form onSubmit={handleEdit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl h-3/4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
      <div className="mb-4">
        <label htmlFor="postTitle" className="block text-gray-700 mb-2">Title:</label>
        <input
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-10 flex-1">
        <label htmlFor="postContent" className="block text-gray-700">Content:</label>
        <textarea
          id="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded h-full"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="isPublished" className="text-gray-700 mr-2">Published:</label>
        <input
          type="checkbox"
          id="isPublished"
          checked={isPublished}
          onChange={handlePublished}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
      <button type="submit" className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 px-4 max-w-fit">Save Post</button>
    </form>
  </div>

)
}