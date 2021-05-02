import React from 'react'

function TeamCard(props) {

  const { id, name, image } = props;

  console.log(image)

  return (
    <figure className='team-card'>
      <img src={image} alt={`${name} Logo`} className='logo'/>
      <figcaption>{name}</figcaption>
    </figure>
  )
}

export default TeamCard;
