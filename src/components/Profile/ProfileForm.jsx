// ProfileForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../common/FormInput'; // Make sure to import FormInput from the correct path
import Button from '../common/Button';
import { asyncUpdateUser } from '../../states/users/thunk';

function ProfileForm() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const currentUser = users.find((user) => user.isAuthenticated); // Assuming `isAuthenticated` flag
  const [formData, setFormData] = useState({
    firstName: currentUser ? currentUser.firstName : '',
    lastName: currentUser ? currentUser.lastName : '',
    bio: currentUser ? currentUser.bio : '',
    email: currentUser ? currentUser.email : '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncUpdateUser(formData));
      // Handle success, maybe show a success message
      console.log('Profile updated successfully!');
    } catch (error) {
      // Handle error, show an error message
      console.error('Update profile failed:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <div className="flex space-x-10">
          <div className="w-1/2">
            <FormInput // Use the imported FormInput component
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <FormInput // Use the imported FormInput component
              id="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <FormInput // Use the imported FormInput component
          id="bio"
          label="Bio"
          type="textarea"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col space-y-5">
        <FormInput // Use the imported FormInput component
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col space-y-5">
        <Button text="Update Profile" type="submit" />
      </div>
    </form>
  );
}

export default ProfileForm;
