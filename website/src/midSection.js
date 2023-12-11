import React, { useState } from 'react';

const MidSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample movie data with image URLs
  const movies = [
    {
      id: 1,
      title: 'Movie 1',
      description: 'Description of Movie 1',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_10251_24809-b.jpg?width=300&quality=85&secret=elcAqHUp3SRYncCHGgAmlg',
    },
    {
      id: 2,
      title: 'Movie 2',
      description: 'Description of Movie 2',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_132875_55225-b.jpg?width=300&quality=85&secret=KWxCbBAGSgSk9rJKV8G2dg',
    },
    {
      id: 3,
      title: 'Movie 3',
      description: 'Description of Movie 3',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_9993_23601-b.jpg?width=300&quality=85&secret=pDLnTSSYMjtid-K6rl7yUg',
    },
    {
      id: 4,
      title: 'Movie 4',
      description: 'Description of Movie 5',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_33786_166-b.jpg?width=300&quality=85&secret=ZlBcueK5Z8WnVh1gU1vZKQ',
    },
    {
      id: 5,
      title: 'Movie 5',
      description: 'Description of Movie 5',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_17893_34991-b.jpg?width=300&quality=85&secret=IdYWNFEkLFPnHQtq1dxw0g',
    },
    {
      id: 6,
      title: 'Movie 6',
      description: 'Description of Movie 6',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_11857_943-b.jpg?width=300&quality=85&secret=D8PX7Z5k8d780rpi0dMCUQ',
    },
    {
      id: 7,
      title: 'Movie 7',
      description: 'Description of Movie 7',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_23603_1-b.jpg?width=300&quality=85&secret=MG-RySZwjdR7zPlMDPG1Ww',
    },
    {
      id: 8,
      title: 'Movie 8',
      description: 'Description of Movie 8',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_116298_34945-b.jpg?width=300&quality=85&secret=Pr7cB7GsER6wa9qcxtYoRA',
    },
    {
      id: 9,
      title: 'Movie 9',
      description: 'Description of Movie 9',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_20417_1-b.jpg?width=300&quality=85&secret=wLdx0IiAgkVCXpA9HHUcmA',
    },
    {
      id: 10,
      title: 'Movie 10',
      description: 'Description of Movie 10',
      imageUrl: 'https://static.cdn.asset.filimo.com/flmt/mov_14823_1-b.jpg?width=300&quality=85&secret=1DhAmSU2l0CfSIbKfcqxfg',
    },
    // Add more movie data as needed
  ];

  // Number of movies to display per page
  const moviesPerPage = 8;

  // Calculate total pages based on the number of movies and movies per page
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Calculate the index of the first and last movie for the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  // Get the movies to display for the current page
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mid-section">
      <div className="movie-cards">
        {currentMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <button>Watch Now</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default MidSection;
