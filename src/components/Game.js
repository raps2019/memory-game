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
  const [ lives, setLives ] = useState(3)
  const [ statusMessage, setStatusMessage ] = useState('Objective: Card can only be selected once per round. Click all cards to advance')
  const [ scoreboardInProp , setScoreboardInProp ] = useState(true)
  const [ cardsInProp , setCardsInProp ] = useState(true)
  const [ gameboardInProp, setGameboardInProp ] = useState(true)
  const [ statusInProp, setStatusInProp ] = useState(true)
  const [ statusClass, setStatusClass ] = useState('text__status--instructions')
  const [ backgroundFlashColor, setBackgroundFlashColor ] = useState('')

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
      if(lives === 0) {
        setStatusClass(null)
        setStatusInProp(true)
        setBackgroundFlashColor('red')
        setStatusMessage(`Game Over`)
        setTimeout(() => {
          setGameboardInProp(false)
          setScoreboardInProp(false)
          setBackgroundFlashColor('')
        },3000)
        setTimeout(() => {
          resetGame()
        }, 3500)
      } else {
        // advanceTurn(id)
        setLives( prevLives => prevLives - 1)
        setBackgroundFlashColor('red')
        setTimeout(() => {
          setBackgroundFlashColor('')
        }, 250)
      }
    }
  }

  const advanceTurn = (id) => {

    if ( cards.filter(item => item.clicked === false).length === 1) {
      setScore( prevScore => prevScore + 1)
      advanceRound(round)
    } else {
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
      }, 250)
      setScore( prevScore => (
        prevScore + 1
      ))
    }  
  }

  const resetGame = () => {
    setScore(0)
    setRound(1)
    setLives(3)
    // setStatusInProp(false)
    setStatusMessage('Objective: Card can only be selected once per round. Click all cards to advance')
    setStatusClass('text__status--instructions')
    setCards(shuffleArray(teamCardsArray).slice(0,5))
    setScoreboardInProp(true)
    setGameboardInProp(true)
  }

  const advanceRound = (round) => {
    if (round === 1 || round === 2 || round === 3 || round === 4 || round === 5) {
      setStatusClass(null)
      setStatusMessage('Round Complete')
      setStatusInProp(true)
      setGameboardInProp(false)
      setTimeout(() => {
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
      }, 3000)
      setTimeout( () => {
        setStatusInProp(false)
      }, 2000)
    } else {
      setStatusMessage('You Win')
      setStatusInProp(true)
      setGameboardInProp(false)
      setTimeout(() => {
        resetGame()
      }, 3000)   
    }
  }  

  useEffect(() => { 
    if (score >= highScore) {
      setHighScore(score)
    }
  }, [score] )

  return (
    <div>
      <CSSTransition
          in={statusInProp}
          appear={true}
          enter={true}
          exit={true}
          timeout={2000}
          classNames="fade-status"
        >
        <StatusDisplay
          statusMessage={statusMessage}
          statusClass={statusClass}
          backgroundFlashColor={backgroundFlashColor}
        />
      </CSSTransition>
      <CSSTransition
        in={scoreboardInProp}
        appear={true}
        enter={true}
        exit={true}
        timeout={1000}
        classNames="fade"
      >
        <ScoreBoard
          round={round}
          score={score}
          highScore={highScore}
          lives={lives}
        />
      </CSSTransition>
      <CSSTransition
        in={gameboardInProp}
        appear={true}
        enter={true}
        exit={true}
        timeout={1000}
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