import React from 'react';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard'
import './App.css';

import cover from 'https://github.com/iamshaunjp/React-Firebase/blob/lesson-58/magic-memory/public/img/cover.png'

const cardImages = [
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/helmet-1.png", matched: false},
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/potion-1.png", matched: false},
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/ring-1.png", matched: false},
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/scroll-1.png", matched: false},
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/shield-1.png", matched: false},
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/sword-1.png", matched: false}
]

export default function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    
    setChoiceTwo(null)
    setChoiceOne(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    //If choiceOne is null then it will be false then run setChoiceOne
    //If choiceOne is not null then it will be true and run setChoiceTwo
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(() => {
    
    if ( choiceOne && choiceTwo ) {
      setDisabled(true)
      if ( choiceOne.src === choiceTwo.src ) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000) 
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //Call this function to "start the game" when the components first mount
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => 
          <SingleCard 
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            flipped={ card === choiceOne || card === choiceTwo || card.matched }
            disabled={disabled}
          />
        )}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}
