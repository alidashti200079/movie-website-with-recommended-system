import React, { useState } from 'react';

const MidSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample movie data with image URLs
  const movies = [
    {
      id: 1,
      title: 'Movie 1',
      description: 'Description of Movie 1',
      imageUrl: 'https://static.bia2mov.art/images400//titles/Q/Q94wQ.jpg',
    },
    {
      id: 2,
      title: 'Movie 2',
      description: 'Description of Movie 2',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmBoVTWkprxGTunZyCUvpyKQ5L_qLWSj8Q4w&usqp=CAU',
    },
    {
      id: 3,
      title: 'Movie 3',
      description: 'Description of Movie 3',
      imageUrl: 'https://static.bia2mov.art/images400//titles/Q/Q7Uvi.jpg',
    },
    {
      id: 4,
      title: 'Movie 4',
      description: 'Description of Movie 5',
      imageUrl: 'https://static.bia2mov.art/images400//titles/Q/Q5puk.jpg',
    },
    {
      id: 5,
      title: 'Movie 5',
      description: 'Description of Movie 5',
      imageUrl: 'https://static.bia2mov.art/images400//titles/Q/Q1Rh9.jpg',
    },
    {
      id: 6,
      title: 'Movie 6',
      description: 'Description of Movie 6',
      imageUrl: 'https://static.bia2mov.art/images300/titles/Q/QurP6.jpg',
    },
    {
      id: 7,
      title: 'Movie 7',
      description: 'Description of Movie 7',
      imageUrl: 'https://static.bia2mov.art/images300/titles/J/JOTCvg.jpg',
    },
    {
      id: 8,
      title: 'Movie 8',
      description: 'Description of Movie 8',
      imageUrl: 'https://static.bia2mov.art/images300/titles/J/JOIYSn.jpg',
    },
    {
      id: 9,
      title: 'Movie 9',
      description: 'Description of Movie 9',
      imageUrl: 'https://via.placeholder.com/300x400?text=Movie+9',
    },
    {
      id: 10,
      title: 'Movie 10',
      description: 'Description of Movie 10',
      imageUrl: 'https://via.placeholder.com/300x400?text=Movie+10',
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
