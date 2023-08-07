import React from 'react';
import './cardGrid.css';

const CardGrid = ({ cards }) => {
  return (
    <div className="card2-grid-container">
      <div className="card2-grid">
        {cards.map((card, index) => (
          <a key={index} href={card.link} className="card2">
            <div className="image-container2">
              <img src={card.image} alt={card.title} />
            </div>
            <div className="title-overlay">
              <h3>{card.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
