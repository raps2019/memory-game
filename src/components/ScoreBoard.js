import React from 'react'

function ScoreBoard(props) {

  const {score, highScore } = props

  return (
    <div className="container__score-board">
      <div className="container__score">
        <p className="text__label">Score:</p>
        <p className="text__score">{score}</p>  
      </div>
      <div className="container__high-score">
        <p className="text__label">High Score:</p>
        <p className="text__score">{highScore}</p>
      </div>
    </div>
  )
}

export default ScoreBoard
