import React, {useState, useEffect} from 'react'
import Card from './Card';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function GameBoard(props) {

  const {handleCardClick, cards, cardsInProp} = props;

  return (
    <div className='container__game-board'>
    {cards.map( item => (
      <CSSTransition
        in={cardsInProp}
        key={item.id}
        appear={true}
        enter={true}
        exit={true}
        timeout={2000}
        classNames="fade"
      >
        <Card 
          id={item.id}
          key={item.id}
          name={item.name}
          image={item.image}
          clicked={item.clicked}
          handleCardClick={handleCardClick}
        />
      </CSSTransition>
    ))}
  </div>
  )
}

export default GameBoard