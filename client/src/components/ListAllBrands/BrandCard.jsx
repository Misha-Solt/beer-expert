import React from 'react'
import BeerCard from '../BeerCard/BeerCard'

const BrandCard = ({ brand }) => {
  return (
    <div>
      <h2>{brand.brandName}</h2>
      <p>URL: {brand.url}</p>
      <p>Description: {brand.brandDescription}</p>
      <p>
        Main Address: {brand.mainAddress.street}, {brand.mainAddress.city},{' '}
        {brand.mainAddress.country}
      </p>
      <h3>Beers:</h3>
      {brand.beers.map((beer) => (
        <BeerCard key={beer._id} beer={beer} />
      ))}
    </div>
  )
}

export default BrandCard
