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
      <div className="container mx-auto px-8 py-8 max-w-[1000px]">
          <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>
          <div className="flex flex-wrap justify-center gap-5">
              {posts.map((post) => (
                  <div key={post._id} className="w-full sm:w-full md:w-1/2 lg:w-1/2 max-w-[350px]">
                      <div className="bg-white p-6 border-2 h-full border-slate-300 rounded-xl shadow-md flex flex-col">
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
                          <p className="text-gray-700 mt-2 line-clamp-5">{post.content}</p>
                          <div className="flex justify-between mt-4">
                              <p className="text-gray-500">Posted by: {post.user.username}</p>
                              <p className={`text-${post.isPublished ? 'green' : 'red'}-500`}>
                                  {post.isPublished ? 'Published' : 'Unpublished'}
                              </p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}