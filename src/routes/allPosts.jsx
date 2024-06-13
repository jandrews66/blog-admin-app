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
    <div className="container mx-auto px-8 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="bg-white p-6 border-2 border-slate-300 rounded-xl shadow-md max-w-md mx-auto">
            <Link to={`/posts/${post._id}`} className="text-xl font-semibold text-blue-500 hover:underline">
              {post.title}
            </Link>
            {post.img && (
                            <img 
                                src={`http://localhost:3000/images/${post.img}`} 
                                alt={post.title} 
                                className="w-full mt-4 rounded-md"
                            />
                        )}
            <p className="text-gray-700 mt-2 line-clamp-4">{post.content}</p>
            <div className="flex justify-between">
              <p className="text-gray-500 mt-4">Posted by: {post.user.username}</p>
              <p className={`mt-4 ${post.isPublished ? 'text-green-500' : 'text-red-500'}`}>
                {post.isPublished ? 'Published' : 'Unpublished'}
              </p>
            </div>

          </li>
        ))}
      </ul>
    </div>
)
}