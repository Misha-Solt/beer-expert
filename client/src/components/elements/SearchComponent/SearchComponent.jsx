import React from 'react'
import BrandCard from '../../elements/BrandCard/BrandCard'
import BeerCard from '../../elements/BeerCard/BeerCard'

const SearchComponent = ({ searchResults }) => {
  return (
    <div>
      {searchResults &&
        searchResults.map((result) =>
          result.beerName ? (
            <BeerCard key={result._id} beer={result} />
          ) : (
            <BrandCard key={result._id} brand={result} />
          )
        )}
    </div>
  )
}

export default SearchComponent
