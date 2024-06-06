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
    <div className="min-h-screen w-full flex flex-row justify-between  p-5">
      <div className=" bg-card1 min-h-full w-1/2 rounded-xl flex items-center justify-center p-5">
        <div className="bg-card2 p-8 rounded-lg shadow-md h-full min-w-full flex items-center justify-center">
          <div className=" w-full">
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
            <p className="mt-4 text-sm text-white">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-white underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h1>blank</h1>
      </div>
    </div>
  );
}

export default LoginPage;
