import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/thunk';
import FormInput from '../components/common/FormInput';
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
    <div className="min-h-screen w-full flex flex-row justify-end  p-5">
      <div className=" bg-card1 min-h-full w-1/2 rounded-xl flex items-center justify-center p-5">
        <div className="bg-card2 p-8 rounded-lg shadow-md h-full min-w-full flex items-center justify-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-6 text-text">
              Create Account
            </h2>
            <form onSubmit={onRegister}>
              <FormInput
                label="First Name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormInput
                label="Last Name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
              <Button type="submit" text="Create Account" />
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
