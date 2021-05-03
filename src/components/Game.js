import React, {useState, useEffect} from 'react'
import blazersImg from '../images/blazers.png'
import bucksImg from '../images/bucks.png'
import bullsImg from '../images/bulls.png'
import cavsImg from '../images/cavs.png'
import celticsImg from '../images/celtics.png'
import clippersImg from '../images/clippers.png'
import grizzliesImg from '../images/grizzlies.png'
import hawksImg from '../images/hawks.png'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'

function Game() {

  //Move this to JSON
  //Import list and randomize the order
  //Create a function to randomize array. run it everytime we set state for cards
  //Everytime card is clicked, randomize array. 

  const [ cards, setCards ] = useState(
    [
      {
        id: 1,
        clicked: false,
        name: "Portland Trailblazers",
        image: blazersImg,
      },
      {
        id: 2,
        clicked: false,
        name: "Milwaukee Bucks",
        image: bucksImg
      },
      {
        id: 3,
        clicked: false,
        name: "Chicago Bulls",
        image: bullsImg
      },
      {
        id: 4,
        clicked: false,
        name: "Cleveland Cavaliers",
        image: cavsImg
      },
      {
        id: 5,
        clicked: false,
        name: "Boston Celtics",
        image: celticsImg
      },
      {
        id: 6,
        clicked: false,
        name: "Los Angeles Clippers",
        image: clippersImg
      },
      {
        id: 7,
        clicked: false,
        name: "Memphis Grizzlies",
        image: grizzliesImg
      },
      {
        id: 8,
        clicked: false,
        name: "Atlanta Hawks",
        image: hawksImg
      }
    ]
  )

  const [ score, setScore ] = useState(0)
  const [ highScore, setHighScore ] = useState(0)

  const handleCardClick = (id) => {

    if (cards.find( item => item.id === id).clicked === false) {
      advanceGame(id)
    } else {
      resetGame()
    }
  }

  const advanceGame = (id) => {
    setCards(
      cards.map( item => 
        item.id === id
        ? {...item, clicked: true}
        : item
      )
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