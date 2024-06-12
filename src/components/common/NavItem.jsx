import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavItem({ to, label, Icon }) {
  return (
    <li className="mb-2">
      <NavLink
        to={to}
        exact="true"
        className={({ isActive }) =>
          `flex items-center justify-center p-3 py-4 rounded
          hover:bg-text hover:text-bekgron 
          ${isActive ? 'text-white bg-card4' : ''}`
        }
      >
        <div className="flex flex-col items-center">
          <Icon className="mb-1 text-2xl" />
          <span className="text-sm hidden md:block">{label}</span>
        </div>
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

export default NavItem;
