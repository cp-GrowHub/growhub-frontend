import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Header({ className, children }) {
  const authUser = useSelector((state) => state.authUser);
  return (
    <header className={`text-white ${className}`}>
      <p className="text-lg">Welcome, {authUser.name.split(' ')[0]}!</p>
      <h1 className="text-3xl font-bold">{children}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.element,
};
