import React from 'react'
import Card from './Card';

function GameBoard(props) {

  const {handleCardClick, cards} = props;

  return (
    <div className='container__game-board'>
    {cards.map( item => (
      <Card 
        id={item.id}
        key={item.id}
        name={item.name}
        image={item.image}
        clicked={item.clicked}
        handleCardClick={handleCardClick}
      />
    ))}
  </div>
  )
}

export default GameBoard