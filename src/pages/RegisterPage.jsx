import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import { asyncRegisterUser } from '../states/users/thunk';
import Button from '../components/common/Button';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (event) => {
    event.preventDefault();
    await dispatch(asyncRegisterUser({ firstName, lastName, email, password }));
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-center md:justify-end p-5">
      <div className="hidden md:flex md:flex-1 items-center justify-center ">
        <div className="flex flex-col gap-1 bg-card2 text-text p-8 rounded-2xl">
          <h1 className="text-3xl font-bold">Registration Info</h1>
          <p className="text-lg max-w-[50rem]">
            Untuk mendaftar di aplikasi GrowHub, Anda perlu mengisi formulir
            pendaftaran dengan informasi yang diperlukan, termasuk nama depan,
            nama belakang, email, dan kata sandi. Setelah pendaftaran berhasil,
            Anda akan dapat masuk ke aplikasi dan mulai menggunakan semua fitur
            yang tersedia.
          </p>
        </div>
      </div>
      <div className="bg-card1 w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/3 rounded-xl flex items-center justify-center p-5 shadow-md">
        <div className="bg-card2 p-8 rounded-lg h-full w-full flex flex-col items-center justify-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-6 text-text">
              Create Account
            </h2>
            <form onSubmit={onRegister} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <FormInput
                  label="First Name"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  tailwindClass="border"
                  maxLength="15"
                  required
                />
                <FormInput
                  label="Last Name"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  tailwindClass="border"
                  maxLength="15"
                  required
                />
              </div>
              <FormInput
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                tailwindClass="border"
                maxLength="30"
              />
              <FormInput
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                tailwindClass="border"
                maxLength="40"
              />
              <Button
                type="submit"
                text="Create Account"
                tailwindClass="bg-bekgron border-none"
              />
            </form>
            <p className="mt-4 text-sm text-white">
              Already have an account?{' '}
              <Link to="/login" className="text-white underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
