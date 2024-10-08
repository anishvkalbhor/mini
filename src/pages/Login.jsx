// src/components/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSigninWithGoogle
} from '../Auth';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await doSignInWithEmailAndPassword(email, password);
      } else {
        await doCreateUserWithEmailAndPassword(email, password);
      }
      navigate('/home');
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doSigninWithGoogle();
      navigate('/home');
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-md rounded-lg shadow-2xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 rounded-lg bg-white/40 text-white placeholder-white/80 border-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 rounded-lg bg-white/40 text-white placeholder-white/80 border-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 mt-4 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Sign in with Google
        </button>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:text-blue-200 transition duration-300"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;