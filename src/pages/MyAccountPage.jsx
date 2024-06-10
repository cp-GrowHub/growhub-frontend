import React from 'react';
import Sidebar from '../components/common/Sidebar';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useSelector } from 'react-redux';

function MyAccountPage() {
  const authUser = useSelector((states) => states.authUser)
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 p-10 ml-32 flex flex-col items-left">
        <h1 className="text-3xl font-bold text-text mb-3 ml-2">Users</h1>
        <div className="flex space-x-10 w-full">
          <div
            className="bg-card1 flex-1 rounded-xl p-10 mb-10"
            style={{ flexBasis: '70%' }}
          >
            <h2 className="text-lg font-bold mb-5 text-white">
              Personal Information
            </h2>
            <form className="space-y-5">
              <div className="flex flex-col space-y-">
                <div className="flex space-x-10">
                  <div className="w-1/2">
                    <FormInput id="firstName" label="First Name" />
                  </div>
                  <div className="w-1/2">
                    <FormInput id="bio" label="Bio" type="textarea" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-">
                <div className="flex space-x-10">
                  <div className="w-1/2">
                    <FormInput id="lastName" label="Last Name" />
                  </div>
                  <div className="w-1/2" />
                </div>
              </div>
              <div className="flex flex-col space-y-">
                <div className="flex space-x-10">
                  <div className="w-1/2">
                    <Button text="Update Name" />
                  </div>
                  <div className="w-1/2">
                    <Button text="Update Bio" />
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <FormInput id="email" label="Email" type="email" />
                <Button text="Update Email" />
              </div>
            </form>
          </div>
          <div
            className="bg-card1 flex-1 rounded-xl p-10 mb-10 flex flex-col items-center"
            style={{ flexBasis: '30%' }}
          >
            <img src={authUser.avatar} className="rounded-full bg-card4 w-20 h-20 mb-5" alt='Avatar' />
            <h3 className="text-lg font-bold mb-1 text-text">
              {authUser.name}
            </h3>
            <p className="text-card4 mb-3">{authUser.email}</p>
            <p className="text-card4">{authUser.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
