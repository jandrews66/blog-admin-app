import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const signupData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      confirm_password: confirmPassword
    };

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful', data);
        // redirect to login
        navigate('/')
      } else {
        console.log('Signup failed', data);
        setErrors(data.errors || [{msg: 'An error has occured'}])
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors([{ msg: 'An unexpected error occurred. Please try again.' }]);

    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/4 flex flex-col">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 px-4 mb-4 max-w-fit">Sign Up</button>
        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((error, index) => (
              <div key={index} className="text-red-500 text-sm mb-2">
                {error.msg}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>

  );
};

export default SignupForm;
