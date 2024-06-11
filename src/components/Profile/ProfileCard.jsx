// ProfileCard.js
import React from 'react';
import { useSelector } from 'react-redux';

function ProfileCard() {
  const authUser = useSelector((state) => state.authUser);

  return (
    <div
      className="bg-card1 flex-1 rounded-xl p-10 mb-10 flex flex-col items-center"
      style={{ flexBasis: '30%' }}
    >
      <img
        src={authUser.avatar}
        className="rounded-full bg-card4 w-20 h-20 mb-5"
        alt="Avatar"
      />
      <h3 className="text-lg font-bold mb-1 text-text">{authUser.name}</h3>
      <p className="text-card4 mb-3">{authUser.email}</p>
      <p className="text-card4">{authUser.bio}</p>
    </div>
  );
}

export default ProfileCard;
