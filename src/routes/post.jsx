import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CommentForm from './components/CommentForm'

export default function AllPosts() {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    let { postId } = useParams();
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

return (
    <div>
        <h2>Post</h2>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>{post.user && post.user.username}</p>
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