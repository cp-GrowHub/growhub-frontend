import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/thunk';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';

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
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-center md:justify-between p-5">
      <div className="bg-card1 w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/3 rounded-xl flex items-center justify-center p-5 shadow-md">
        <div className="bg-card2 p-8 rounded-lg h-full w-full flex flex-col items-center justify-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-6 text-text">Sign in</h2>
            <form onSubmit={onLogin} className="flex flex-col gap-4">
              <FormInput
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                tailwindClass="border"
              />
              <FormInput
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                tailwindClass="border"
              />
              <Button
                type="submit"
                text="Sign in"
                tailwindClass="bg-bekgron border-none"
              />
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

      <div className="hidden md:block">
        <span className="text-bekgron">blank</span>
      </div>
    </div>
  );
}

export default LoginPage;
