import React from 'react';
import './actors.css';
import Footer from './footer';
import Navbar from './navbar';

const Actors = () => {
  const actors = [
    {
      id: 1,
      name: 'Actor 1',
      image: 'https://static.cdn.asset.filimo.com/flmt/rvw_cast_6963_1-b.jpg?width=220&quality=85&secret=jTKqIU3Nj9N4IUsfcEQX2A',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
    },
    {
      id: 2,
      name: 'Actor 2',
      image: 'https://static.cdn.asset.filimo.com/flmt/rvw_cast_1492_621-b.jpg?width=220&quality=85&secret=3ZNMDpY4OurIlMLK1HjHog',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
    },
    {
        id: 1,
        name: 'Actor 3',
        image: 'https://static.cdn.asset.filimo.com/flmt/rvw_cast_1483_747-b.jpg?width=220&quality=85&secret=V1FIrlLDARdMd-_3oj5r9w',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
      },
      {
        id: 2,
        name: 'Actor 4',
        image: 'https://static.cdn.asset.filimo.com/flmt/rvw_cast_750_358-b.jpg?width=220&quality=85&secret=DGTNa8i73YlDzHHGVtXJIw',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
      },
      {
        id: 1,
        name: 'Actor 5',
        image: 'https://static.cdn.asset.filimo.com/flmt/rvw_cast_1493_761-b.jpg?width=220&quality=85&secret=_2AMmDTSedJ5px8wxsiJ9Q',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac volutpat risus, non malesuada enim.',
      },
      {
        id: 2,
        name: 'Actor 6',
        image: 'https://static.cdn.asset.filimo.com/flmt/rvw_cast_6295_1-b.jpg?width=220&quality=85&secret=-U6LRTvu7_f6nNnp0f_g3A',
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
