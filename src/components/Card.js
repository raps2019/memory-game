import React from 'react'


function Card(props) {

  const { id, name, image, clicked, handleCardClick } = props;

  console.log(image)

  return (
    <figure 
      className={`container__card ${clicked === true ? 'container__card--clicked' : null}`}
      onClick={(e) => handleCardClick(id)}>
      <img src={image} alt={`${name} Logo`} className='card__logo'/>
      {/* <figcaption className='card__caption'>{name.toUpperCase()}</figcaption> */}
    </figure>
  )
}

export default Card;
