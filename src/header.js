import React from 'react';
import headImage from "./pics/002.jpg";
import './header.css';

const Header = () => {
  const headerStyle = {
    backgroundImage: `url(${headImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '170px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
  };

  return (
    <header style={headerStyle}>
      <h1>Movie Website</h1>
      <p>Welcome to our collection of movies, TV shows, and actors!</p>
    </header>
  );
};

export default Header;
