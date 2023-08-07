import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input className="input" type="text" placeholder="Search..." />
      <button className="button" type="submit">Search</button>
    </div>
  );
};

export default SearchBar;
