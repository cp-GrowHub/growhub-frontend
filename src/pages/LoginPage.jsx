import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/thunk';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-card1 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-text">Sign in</h2>
        <form onSubmit={onLogin}>
          <FormInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" text="Sign in" />
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
