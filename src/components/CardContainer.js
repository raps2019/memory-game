import React, {useState, useEffect} from 'react'
import TeamCard from './TeamCard'
import blazersImg from '../images/blazers.png'
import bucksImg from '../images/bucks.png'

function CardContainer() {

  const [ teamCards, setTeamCards ] = useState(
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
      }
    ]
  )


  return (
    <div className='cards-container'>
      {teamCards.map( team => (
        <TeamCard 
          id={team.id}
          key={team.id}
          name={team.name}
          image={team.image}
        />
      ))}
    </div>
  )
}


export default CardContainer