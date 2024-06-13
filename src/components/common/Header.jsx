import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Header({ className, children }) {
  const authUser = useSelector((state) => state.authUser);
  return (
    <header className={`text-white ${className}`}>
      <p className="text-md md:text-lg">
        Welcome, {authUser.name.split(' ')[0]}!
      </p>
      <h1 className="text-2xl md:text-3xl font-bold">{children}</h1>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
