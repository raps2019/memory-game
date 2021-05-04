import React, {useState, useEffect} from 'react'
import teamCardsArray from './teamCardsArray'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'
import StatusDisplay from './StatusDisplay'
import { CSSTransition } from 'react-transition-group'

function Game() {

  const [ score, setScore ] = useState(0)
  const [ highScore, setHighScore ] = useState(0)
  const [ round, setRound ] = useState(1)
  const [ statusMessage, setStatusMessage ] = useState('')
  const [ displayStatus, setDisplayStatus ] = useState(false)
  const [ scoreboardInProp , setScoreboardInProp ] = useState(true)
  const [ cardsInProp , setCardsInProp ] = useState(true)
  const [ gameboardInProp, setGameboardInProp ] = useState(true)

  const shuffleArray = (array) => {
    const arrayCopy = array.slice(0)
    for ( let i = arrayCopy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
    }
    return arrayCopy;
  }

  const [ cards, setCards ] = useState(shuffleArray(teamCardsArray).slice(0, 5));

  const handleCardClick = (id) => {
    //Check if card has been clicked.
    if (cards.find( item => item.id === id).clicked === false) {
      advanceTurn(id)
    } else {
      setStatusMessage(`Game Over`)
      setDisplayStatus(true)
      setGameboardInProp(false)
      setTimeout(() => {
        setDisplayStatus(false)
        setStatusMessage('')
        setGameboardInProp(true)
        setScoreboardInProp(false)
        setScoreboardInProp(true)
        resetGame()
      },2000)
    }
  }

  const advanceTurn = (id) => {
    
    setCardsInProp(false)
    setTimeout( () => {
      setCards(
        shuffleArray(cards.map( item => 
          item.id === id
          ? {...item, clicked: true}
          : item
        ))
      )
      setCardsInProp(true)
    }, 2000)
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
      setGameboardInProp(false)
      setTimeout(() => {
        setDisplayStatus(false)
        setStatusMessage('')
        setRound(round + 1);
        if (round === 1) {
          setCards(shuffleArray(teamCardsArray).slice(0,10))
          setGameboardInProp(true)
        } else if (round === 2) {
          setCards(shuffleArray(teamCardsArray).slice(0,15))
          setGameboardInProp(true)
        } else if (round === 3) {
          setCards(shuffleArray(teamCardsArray).slice(0,20))
          setGameboardInProp(true)
        } else if (round === 4) {
          setCards(shuffleArray(teamCardsArray).slice(0,25))
          setGameboardInProp(true)
        } else if (round === 5) {
          setCards(shuffleArray(teamCardsArray).slice(0,30))
          setGameboardInProp(true)
        }
      }, 2000)
    } else {
      setStatusMessage('You Win')
      setDisplayStatus(true)
      setTimeout(() => {
        setDisplayStatus(false)
        setStatusMessage('')
        resetGame()
      }, 2000)   
    }
  }  

  useEffect(() => { 
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
      <CSSTransition
        in={scoreboardInProp}
        appear={true}
        enter={true}
        exit={false}
        timeout={2000}
        classNames="fade"
      >
        <ScoreBoard
          round={round}
          score={score}
          highScore={highScore}
        />
      </CSSTransition>
      <CSSTransition
        in={gameboardInProp}
        appear={true}
        enter={true}
        exit={true}
        timeout={2000}
        classNames="fade"
      >
        <GameBoard 
          cards={cards}
          handleCardClick={handleCardClick}
          cardsInProp={cardsInProp}
        />
      </CSSTransition>
    </div>
  )
}


export default Game