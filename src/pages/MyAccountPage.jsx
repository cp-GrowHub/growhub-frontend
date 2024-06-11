import React from 'react';
import ProfileForm from '../components/Profile/ProfileForm';
import ProfileCard from '../components/Profile/ProfileCard';

function MyAccountPage() {
  return (
    <div className="min-h-screen w-full flex">
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
            <ProfileForm />
          </div>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
