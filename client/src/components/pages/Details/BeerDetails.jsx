import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './beerDetails.module.css'
import BeerCard from '../../elements/BeerCard/BeerCard'

export default function BeerDetails() {
  const { beerId } = useParams()
  const [beerDetails, setBeerDetails] = useState(null)

  useEffect(() => {
    fetchBeerDetails()
  })

  const fetchBeerDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/beers/${beerId}`)
      const fetchedBeerDetails = res.data
      setBeerDetails(fetchedBeerDetails)
    } catch (error) {
      console.error('Error fetching beer details:', error)
    }
  }

  return (
    <>
      {beerDetails ? (
        <div className={styles.container}>
          <BeerCard beer={beerDetails} />
          <div className={styles.brand}>
            <h2>Brand: {beerDetails.brandName}</h2>
            <p>Website: {beerDetails.url} </p>
            <p>Brand Description: {beerDetails.brandDescription}</p>
            <p>
              MainAddress: {beerDetails.mainAddress.country},{' '}
              {beerDetails.mainAddress.land}
              {beerDetails.mainAddress.city}, {beerDetails.mainAddress.street}{' '}
              {beerDetails.mainAddress.number}, PLZ:{' '}
              {beerDetails.mainAddress.plz}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading beer details...</p>
      )}
    </>
  )
}
