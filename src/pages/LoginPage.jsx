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

      <div className="hidden md:flex md:flex-1 items-center justify-center">
        <div className="flex flex-row text-text items-center gap-8 bg-card2 hover:bg-bekgron hover:border-[1px] p-4 px-10 rounded-3xl  group">
          <img
            src="/logo.svg"
            alt="icon"
            className="object-cover rounded-3xl w-40 h-40"
          />
          <div className="flex flex-col gap-1 relative">
            <h1 className="text-3xl font-bold">GrowHub</h1>
            <p className="text-lg max-w-[50rem]">
              GrowHub adalah aplikasi yang dirancang untuk membantu pengguna
              mengelola kehidupan sehari-hari dengan lebih efektif. Aplikasi ini
              memiliki beberapa fitur utama, termasuk autentikasi pengguna untuk{' '}
              <em>register</em> dan <em>login</em>, <em>Homepage</em>,{' '}
              <em>To-Do List</em>, <em>Goals</em>, <em>Notes</em>,{' '}
              <em>Discussion</em>, dan <em>Blog</em>. Serta memiliki fitur
              berbagi untuk catatan dan blog untuk <em>guest</em> atau{' '}
              <em>registered user</em>.
            </p>
            <div className="absolute top-0 left-[10rem] mt-[0.4rem] hidden group-hover:block">
              <a
                href="https://github.com/cp-GrowHub"
                target="_blank"
                className="text-blue-500 underline"
              >
                Go to Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
