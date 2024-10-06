// src/components/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  doCreateUserWithEmailAndPassword, 
  doSignInWithEmailAndPassword, 
  doSigninWithGoogle 
} from '../Auth'; // Adjust the path according to your structure

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await doSignInWithEmailAndPassword(email, password);
      } else {
        await doCreateUserWithEmailAndPassword(email, password);
      }
      // Redirect to home page on successful authentication
      navigate('/home'); // Use navigate to redirect
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error("Error during authentication:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doSigninWithGoogle();
      // Redirect to home page on successful Google sign-in
      navigate('/home'); // Use navigate to redirect
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Sign in with Google
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
