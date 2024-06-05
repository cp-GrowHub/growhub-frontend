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

function Sidebar() {
  return (
    <aside className="bg-card1 text-text w-30 p-1 flex flex-col min-h-screen">
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
                <span className=" text-sm">My Account</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/"
              exact
              className={({ isActive }) =>
                `flex items-center justify-center p-3 pb-4 rounded
                hover:bg-text hover:text-bekgron 
                ${isActive ? 'text-white bg-card4' : ''}`
              }
            >
              <div className="flex flex-col items-center">
                <FaHome className="mb-1 text-2xl" />
                <span className="text-sm">Home</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                `flex items-center justify-center p-3 py-4 rounded
                hover:bg-text hover:text-bekgron 
                ${isActive ? 'text-white bg-card4' : ''}`
              }
            >
              <div className="flex flex-col items-center">
                <FaTasks className="mb-1 text-2xl" />
                <span className="text-sm">To-Do List</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/goals"
              className={({ isActive }) =>
                `flex items-center justify-center p-3 py-4 rounded
                hover:bg-text hover:text-bekgron 
                ${isActive ? 'text-white bg-card4' : ''}`
              }
            >
              <div className="flex flex-col items-center">
                <FaBullseye className="mb-1 text-2xl" />
                <span className="text-sm">Goals</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `flex items-center justify-center p-3 py-4 rounded
                hover:bg-text hover:text-bekgron 
                ${isActive ? 'text-white bg-card4' : ''}`
              }
            >
              <div className="flex flex-col items-center">
                <FaStickyNote className="mb-1 text-2xl" />
                <span className="text-sm">Notes</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/discussion"
              className={({ isActive }) =>
                `flex items-center justify-center p-3 py-4 rounded
                hover:bg-text hover:text-bekgron 
                ${isActive ? 'text-white bg-card4' : ''}`
              }
            >
              <div className="flex flex-col items-center">
                <FaComments className="mb-1 text-2xl" />
                <span className="text-sm">Discussion</span>
              </div>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `flex items-center justify-center p-3 py-4 rounded
                hover:bg-text hover:text-bekgron 
                ${isActive ? 'text-white bg-card4' : ''}`
              }
            >
              <div className="flex flex-col items-center">
                <FaBlog className="mb-1 text-2xl" />
                <span className="text-sm">Blog</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sticky bottom-0 p-4">
        <button
          type="button"
          className="flex items-center justify-center w-full p-1 rounded-2xl text-text bg-black-0 outline-2 outline hover:bg-red-700"
          onClick={() => console.log('Log Out')}
        >
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
