import React from 'react'

const BeerCard = ({ beer }) => {
  return (
    <div>
      <h3>{beer.beerName}</h3>
      <p>Beer Type: {beer.beerType}</p>
      <p>Fermented Type: {beer.fermentedType}</p>
      <p>Description: {beer.beerDescription}</p>
      <p>ABV: {beer.alcoholByVolume}</p>
      <p>Color: {beer.color}</p>
      <p>Mouthfeel: {beer.mouthfeel}</p>
      <p>Aroma: {beer.aroma}</p>
      <p>Average Rating: {beer.avgRating}</p>
    </div>
  )
}

export default BeerCard
