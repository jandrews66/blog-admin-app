import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/posts", {                
            mode: "cors",
            dataType: 'json',
         })
            .then((response) => (response.json()))
            .then((data) => {
                setPosts(data)
            })
            .catch((error) => console.error(error));
    }, []);

return (
    <div>
        <h2>All Posts</h2>
        <ul>
            {posts.map((post) => (
                <li key={post._id}>
                    <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    <p>{post.content}</p>
                    <p>{post.user.username}</p>
                </li>
            ))}
        </ul>
    </div>
)
}