import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)
    }
  }

  return(
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back" 
          src="https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/cover.png"
          alt="card back" 
          onClick={handleClick}
        />
      </div>
    </div>
  );
}