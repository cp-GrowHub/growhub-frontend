import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import useInput from '../hooks/useInput';
import { asyncUpdateUser } from '../states/users/thunk';
import Modal from '../components/common/Modal';

function MyAccountPage() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const [firstName, handleFirstNameChange] = useInput(authUser.firstName || '');
  const [lastName, handleLastNameChange] = useInput(authUser.lastName || '');
  const [email, handleEmailChange] = useInput(authUser.email || '');
  const [bio, handleBioChange] = useInput(authUser.bio || '');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('bg-green-500');

  const handleUpdateName = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateUser({ firstName, lastName }))
      .then(() => {
        setModalMessage('Name updated successfully');
        setModalColor('bg-green-500');
        setIsModalVisible(true);
      })
      .catch(() => {
        setModalMessage('Failed to update name');
        setModalColor('bg-red-500');
        setIsModalVisible(true);
      });
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateUser({ email }))
      .then(() => {
        setModalMessage('Email updated successfully');
        setModalColor('bg-green-500');
        setIsModalVisible(true);
      })
      .catch(() => {
        setModalMessage('Failed to update email');
        setModalColor('bg-red-500');
        setIsModalVisible(true);
      });
  };

  const handleUpdateBio = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateUser({ bio }))
      .then(() => {
        setModalMessage('Bio updated successfully');
        setModalColor('bg-green-500');
        setIsModalVisible(true);
      })
      .catch(() => {
        setModalMessage('Failed to update bio');
        setModalColor('bg-red-500');
        setIsModalVisible(true);
      });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="flex-1 p-10 flex flex-col items-left">
        <h1 className="text-3xl font-bold text-text mb-3 ml-2">User</h1>
        <div className="flex space-x-10 w-full">
          <div
            className="bg-card1 flex-1 rounded-xl p-10 mb-10"
            style={{ flexBasis: '70%' }}
          >
            <h2 className="text-lg font-bold mb-5 text-white">
              Personal Information
            </h2>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-4 flex-1">
                <form className=" flex-1 w-full" onSubmit={handleUpdateName}>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-4">
                      <FormInput
                        id="firstName"
                        label="First Name"
                        placeholder="first name.."
                        maxLength="15"
                        onChange={handleFirstNameChange}
                      />
                      <FormInput
                        id="lastName"
                        label="Last Name"
                        placeholder="last name.."
                        maxLength="15"
                        onChange={handleLastNameChange}
                      />
                    </div>
                    <div className="flex justify-end">
                      <div>
                        <Button type="submit" text="Update Name" />
                      </div>
                    </div>
                  </div>
                </form>
                <form className="" onSubmit={handleUpdateEmail}>
                  <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="new email..."
                    maxLength="30"
                    onChange={handleEmailChange}
                  />
                  <div className="flex justify-end">
                    <div>
                      <Button type="submit" text="Update Email" />
                    </div>
                  </div>
                </form>
              </div>
              <form
                className=" flex-1 flex flex-col"
                onSubmit={handleUpdateBio}
              >
                <label htmlFor="bio" className="flex flex-col">
                  <span className="text-text mb-2">Bio</span>
                  <textarea
                    className="bg-card2 text-text px-4 py-2 rounded-xl outline-none focus:ring-1 focus:ring-card4"
                    id="bio"
                    label="Bio"
                    type="textarea"
                    placeholder="new bio..."
                    maxLength="80"
                    rows="4"
                    onChange={handleBioChange}
                  />
                </label>
                <div className="flex justify-end">
                  <div>
                    <Button type="submit" text="Update Bio" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="bg-card1 flex-1 rounded-xl p-10 mb-10 flex flex-col items-center"
            style={{ flexBasis: '30%' }}
          >
            <img
              src={authUser.avatar}
              className="rounded-full bg-card4 w-20 h-20 mb-5"
              alt="Avatar"
            />
            <h3 className="text-lg font-bold mb-1 text-text">
              {authUser.name}
            </h3>
            <p className="text-card4 mb-3">{authUser.email}</p>
            <p className="text-card4">{authUser.bio}</p>
          </div>
        </div>
      </div>
      <Modal
        text={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
        color={modalColor}
      />
    </div>
  );
}

export default MyAccountPage;
