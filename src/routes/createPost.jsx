import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreatePost(){
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImg, setPostImg] = useState(null);
    const [isPublished, setIsPublished] = useState(false)
    let userId = localStorage.getItem('userId')
    const navigate = useNavigate();

    useEffect(() => {
      if (!userId) {
        navigate('/login'); // Redirect to login if no userId found
      }
    }, [userId, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //FormData needed to append both text and file inputs
        const formData = new FormData();
        formData.append('title', postTitle);
        formData.append('content', postContent);
        formData.append('user', userId);
        formData.append('isPublished', isPublished);
        if (postImg) {
          formData.append('img', postImg);
        } else {
          formData.append('img', 'placeholder-image.jpeg'); 
        }

        try {
          const token = localStorage.getItem('token'); // Retrieve token from local storage
          if (!token) {
            console.error('No token found');
            localStorage.removeItem('token');
            navigate('/')
            return;
          }
          const response = await fetch(`https://dazzling-elemental-airplane.glitch.me/posts`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`, // Attach token to the request
            },
            body: formData,
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

    function handlePublished(){
      setIsPublished(!isPublished)
    }

    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl h-3/4 flex flex-col">
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
              onChange={handlePublished}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postImg" className="block text-gray-700 mb-2">Image:</label>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={(e) => setPostImg(e.target.files[0])}
                />
          </div>
          <button type="submit" className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 px-4 max-w-fit">Create Post</button>
        </form>
      </div>
    );
  }