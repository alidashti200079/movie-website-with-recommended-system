import React from 'react';
import './actors.css';
import Footer from './footer';
import Navbar from './navbar';

const Actors = () => {
  const actors = [
    {
      id: 1,
      name: 'Actor 1',
      image: 'https://static.bia2mov.art/images400/names/Q/Qgo36.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
    },
    {
      id: 2,
      name: 'Actor 2',
      image: 'https://static.bia2mov.art/images400/names/Q/Q1uep.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
    },
    {
        id: 1,
        name: 'Actor 3',
        image: 'https://static.bia2mov.art/images400/names/Q/Q6Qx5.jpg',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
      },
      {
        id: 2,
        name: 'Actor 4',
        image: 'https://static.bia2mov.art/images400/names/Q/Q6D9T.jpg',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
      },
      {
        id: 1,
        name: 'Actor 5',
        image: 'https://static.bia2mov.art/images400/names/Q/Q53TJ.jpg',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
      },
      {
        id: 2,
        name: 'Actor 6',
        image: 'https://static.bia2mov.art/images400/names/Q/Q737M.jpg',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
      },
    // Add more actors as needed
  ];

  return (
    <>
    <Navbar/>
    <div className="actors-page">
      <h2>Popular Actors</h2>
      <div className="actor-list">
        {actors.map((actor) => (
          <div key={actor.id} className="actor-card">
            <img src={actor.image} alt={actor.name} className="actor-image" />
            <div className="actor-details">
              <h3>{actor.name}</h3>
              <p>{actor.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Actors;
