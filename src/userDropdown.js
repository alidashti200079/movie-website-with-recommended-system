import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import './userDropdown.css';

const UserDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="user-dropdown">
      <button className="user-icon" onClick={toggleDropdown}>
        <FaUser />
      </button>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signUp">Sign Up</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
