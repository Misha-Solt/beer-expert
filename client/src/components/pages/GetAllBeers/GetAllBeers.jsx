import React from 'react'
import BeerCard from '../../elements/BeerCard/BeerCard'

export default function GetAllBeers({ beers }) {
  return (
    <div>
      <>
        {beers?.map((beer) => (
          <BeerCard key={beer._id} beer={beer} />
        ))}
      </>
    </div>
  )
}
