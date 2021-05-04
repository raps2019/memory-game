import React, {useState, useEffect} from 'react'
import Card from './Card';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function GameBoard(props) {

  const [ appearGameboard , setAppearGameboard ] = useState(true)


  const {handleCardClick, cards} = props;

  return (
    <div className='container__game-board'>
    {cards.map( item => (
      <CSSTransition
        in={appearGameboard}
        appear={true}
        enter={true}
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