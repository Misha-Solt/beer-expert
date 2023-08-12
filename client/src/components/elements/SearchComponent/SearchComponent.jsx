import React from 'react'
import BrandCard from '../../elements/BrandCard/BrandCard'
import BeerCard from '../../elements/BeerCard/BeerCard'
import styles from './searchComponent.module.css'

const SearchComponent = ({ searchResults }) => {
  return (
    <div className={styles.container}>
      {searchResults &&
        searchResults.map((result) =>
          result.beerName ? (
            <div
              className={styles.beerElement}
              key={`beerElement${result._id}`}
            >
              <BeerCard key={result._id} beer={result} />
            </div>
          ) : (
            <div
              className={styles.brandElement}
              key={`brandElement${result._id}`}
            >
              <BrandCard key={result._id} brand={result} />
            </div>
          )
        )}
    </div>
  )
}

export default SearchComponent
