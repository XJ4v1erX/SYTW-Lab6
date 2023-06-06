
import React from 'react';
import './Card.css';

const Card = ({ link, flipped, flipCard, card }) => {
  const handleClick = () => {
    flipCard(card);
  };

  return (
    <div className="Card">
      <div className={flipped ? 'flipped' : ''} onClick={handleClick}>
        <img src={link} className="front"></img>
        <img src="https://i.postimg.cc/QxqwtCZR/8636557-vapor-wave-cd-dvd-deathskelly-vapor-vaporwave-vaporwaveaesthetic-removebg.png" className="back"></img>
      </div>
    </div>
  );
};

export default Card;
