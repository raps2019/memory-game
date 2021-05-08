import React from 'react'

function ScoreBoard(props) {

  const {round, score, highScore, lives } = props

  return (
    <div className="container__score-board">
      <div className="container__round">
        <p className="text__label">Round:</p>
        <p className="text__score">{round}</p>  
      </div>
      <div className="container__score">
        <p className="text__label">Score:</p>
        <p className="text__score">{score}</p>  
      </div>
      <div className="container__high-score">
        <p className="text__label">High Score:</p>
        <p className="text__score">{highScore}</p>
      </div>
      <div className="container__lives">
        <p className="text__label">Lives</p>
        <p className="text__score">{lives}</p>
      </div>
    </div>
  )
}

export default ScoreBoard
