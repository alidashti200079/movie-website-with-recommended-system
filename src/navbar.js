import React from 'react';
import './searchbar.css';
import SearchBar from './searchbar';
import UserDropdown from './userDropdown';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/movies">Movies</a>
        </li>
        <li>
          <a href="/tvshows">TV Shows</a>
        </li>
        <li>
          <a href="/actors">Actors</a>
        </li>              
        <li>
          <a href="/Help">Help</a>
        </li>
        <li className='dropdown'>
          <UserDropdown/>
        </li> 
        <SearchBar />
      </ul>     
    </nav>
  );
};

export default Navbar;
