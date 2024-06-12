import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUser,
  FaHome,
  FaTasks,
  FaBullseye,
  FaStickyNote,
  FaComments,
  FaBlog,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import NavItem from './NavItem';

function Sidebar({ onLogout }) {
  return (
    <aside className="bg-card1 text-text w-14 md:w-32 p-1 flex flex-col min-h-screen fixed top-0 left-0">
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center justify-center p-4 py-6 rounded
                hover:bg-text hover:text-bekgron 
                ${isActive ? 'text-white bg-card4' : ''}`
              }
            >
              <div className="flex flex-col items-center">
                <FaUser className="mb-1 text-2xl" />
                <span className="text-sm hidden md:block">My Account</span>
              </div>
            </NavLink>
          </li>
          <NavItem to="/" exact="true" label="Home" Icon={FaHome} />
          <NavItem to="/todos" label="To-Do List" Icon={FaTasks} />
          <NavItem to="/goals" label="Goals" Icon={FaBullseye} />
          <NavItem to="/notes" label="Notes" Icon={FaStickyNote} />
          <NavItem to="/discussion" label="Discussion" Icon={FaComments} />
          <NavItem to="/blog" label="Blog" Icon={FaBlog} />
        </ul>
      </nav>
      <div className="p-4">
        <button
          type="button"
          className="flex items-center justify-center w-full p-1 rounded-2xl text-text bg-black-0 outline-2 outline hover:bg-red-700"
          onClick={onLogout}
        >
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Sidebar;
