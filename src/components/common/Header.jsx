import React from 'react';
import PropTypes from 'prop-types';

function Header({ title = 'GrowHub' }) {
  return (
    <header className="text-text p-4">
      <h1 className="text-4xl">{title}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
};
