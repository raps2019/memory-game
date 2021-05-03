import React, {useState, useEffect} from 'react'
import teamCardsArray from './teamCardsArray'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'

function Game() {

  //Move this to JSON
  //Import list and randomize the order
  //Create a function to randomize array. run it everytime we set state for cards
  //Everytime card is clicked, randomize array. 

  const [ score, setScore ] = useState(0)
  const [ highScore, setHighScore ] = useState(0)

  const shuffleArray = (array) => {
    const arrayCopy = array.slice(0)
    for ( let i = arrayCopy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
    }
    return arrayCopy;
  }

  const [ cards, setCards ] = useState(shuffleArray(teamCardsArray))

  const handleCardClick = (id) => {

    if (cards.find( item => item.id === id).clicked === false) {
      advanceGame(id)
    } else {
      resetGame()
    }
  }

  const advanceGame = (id) => {
    setCards(
      shuffleArray(cards.map( item => 
        item.id === id
        ? {...item, clicked: true}
        : item
      ))
    )
    setScore( prevScore => (
      prevScore + 1
    ))
  }

  const resetGame = () => {
    if (score > highScore) {
      setHighScore(score)
    }
    setScore(0)
    setCards(
      cards.map( item => ({...item, clicked: false}))
    )
  }

  useEffect( () => {
    // console.log(cards)
    console.log(`Score : ${score}`)
    console.log(`High Score: ${highScore}`)
  },[cards, score, highScore])


  return (
    <div>
      <ScoreBoard
        score={score}
        highScore={highScore}
      />
      <GameBoard 
        cards={cards}
        handleCardClick={handleCardClick}
      />
    </div>
  )
}


export default Game