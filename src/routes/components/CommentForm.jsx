import { useState } from 'react';

export default function CommentForm({ postId, setComments }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      const newComment = await response.json();
      setComments(prevComments => [...prevComments, newComment])

      // Optionally handle successful creation (e.g., show a success message)
      console.log('Comment created successfully');

      // Reset the form
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }
  };

  return (
    <div>
      <h2>Create a New Comment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}