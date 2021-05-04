import React, {useState, useEffect} from 'react'
import teamCardsArray from './teamCardsArray'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'
import StatusDisplay from './StatusDisplay'

function Game() {

  //Move this to JSON
  //Import list and randomize the order
  //Create a function to randomize array. run it everytime we set state for cards
  //Everytime card is clicked, randomize array. 

  const [ score, setScore ] = useState(0)
  const [ highScore, setHighScore ] = useState(0)
  const [ round, setRound ] = useState(1)
  const [ statusMessage, setStatusMessage ] = useState('')
  const [ displayStatus, setDisplayStatus ] = useState(false)

  const shuffleArray = (array) => {
    const arrayCopy = array.slice(0)
    for ( let i = arrayCopy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
    }
    return arrayCopy;
  }

  const [ cards, setCards ] = useState(shuffleArray(teamCardsArray).slice(0, 5))

  const handleCardClick = (id) => {
    //Check if card has been clicked.
    if (cards.find( item => item.id === id).clicked === false) {
      advanceTurn(id)
    } else {
      setStatusMessage('Game Over')
      setDisplayStatus(true)
      setTimeout( () => {
        setDisplayStatus(false)
        setStatusMessage('')
        resetGame()
      },3000)
    }
  }

  const advanceTurn = (id) => {
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
    setRound(1)
    setCards(shuffleArray(teamCardsArray).slice(0,5))
  }

  const advanceRound = (round) => {
    
    if (round === 1 || round === 2 || round === 3 || round === 4 || round === 5) {
      setStatusMessage('Round Complete')
      setDisplayStatus(true)
      setTimeout( () => {
        setDisplayStatus(false)
        setStatusMessage('')
        setRound(round + 1);
        if (round === 1) {
          setCards(shuffleArray(teamCardsArray).slice(0,10))
        } else if (round === 2) {
          setCards(shuffleArray(teamCardsArray).slice(0,15))
        } else if (round === 3) {
          setCards(shuffleArray(teamCardsArray).slice(0,20))
        } else if (round === 4) {
          setCards(shuffleArray(teamCardsArray).slice(0,25))
        } else if (round === 5) {
          setCards(shuffleArray(teamCardsArray).slice(0,30))
        }
      }, 3000)
    } else {
      setStatusMessage('You Win')
      setDisplayStatus(true)
      setTimeout( () => {
        setDisplayStatus(false)
        setStatusMessage('')
        resetGame()
      }, 3000)   
    }
  }  

  useEffect( () => { 
    if ( !cards.find( item => item.clicked === false)) {
      advanceRound(round)
    }
  }, [cards] )

  return (
    <div>
      <StatusDisplay
        statusMessage={statusMessage}
        displayStatus={displayStatus}
      />
      <ScoreBoard
        round={round}
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