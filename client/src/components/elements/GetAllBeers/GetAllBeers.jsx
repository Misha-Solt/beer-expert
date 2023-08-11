import React from 'react'
import BeerCard from '../../elements/BeerCard/BeerCard'
import styles from './getAllBeers.module.css'

export default function GetAllBeers({ beers }) {
  return (
    <div className={styles.allBeersContainer}>
      <>
        {beers?.map((beer) => (
          <div className={styles.element}>
            <BeerCard key={beer._id} beer={beer} />
          </div>
        ))}
      </>
    </div>
  )
}
