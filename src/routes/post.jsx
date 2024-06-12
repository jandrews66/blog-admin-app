import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CommentForm from './components/CommentForm'
import '../index.css'

export default function AllPosts() {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    let { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`, {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setPost(data)
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}/comments`, {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setComments(data)
            })
            .catch((error) => console.error(error));
    }, []);

    function handleEdit(){
        navigate(`${location.pathname}/edit`);

    }
    function handleDelete(){
        navigate(`${location.pathname}/delete`);

    }
return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold mb-4 text-center">Post</h2>
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <p className="text-2xl font-semibold text-blue-500 mb-4">{post.title}</p>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-gray-500 mb-4">Author: {post.user && post.user.username}</p>
      <p className={`mb-4 ${post.isPublished ? 'text-green-500' : 'text-red-500'}`}>
        {post.isPublished ? 'Published' : 'Unpublished'}
      </p>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment._id} className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="font-semibold">{comment.name}</p>
            <p className="text-gray-700">{comment.message}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
}