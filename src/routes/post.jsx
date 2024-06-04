import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CommentForm from './components/CommentForm'

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
    <div>
        <h2>Post</h2>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>Author: {post.user && post.user.username}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <ul>
            {comments.map((comment) => 
                <li key={comment._id}>
                    <p>{comment.name}</p>
                    <p>{comment.message}</p>
                </li>
            )}

            </ul>
            <CommentForm postId={postId} setComments={setComments} />
    </div>
)
}