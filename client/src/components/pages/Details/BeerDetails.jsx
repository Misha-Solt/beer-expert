import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './beerDetails.module.css'
import BeerCard from '../../elements/BeerCard/BeerCard'
import BackButton from '../../elements/BackButton/BackButton'
import ForwardButton from '../../elements/ForwardButton/ForwardButton'

export default function BeerDetails() {
  const { beerId } = useParams()
  const [beerDetails, setBeerDetails] = useState(null)

  useEffect(() => {
    fetchBeerDetails()
    // eslint-disable-next-line
  }, [beerId])

  const fetchBeerDetails = async () => {
    try {
      // const res = await axios.get(`http://localhost:3001/api/beers/${beerId}`)
      const res = await axios.get(`/api/beers/${beerId}`)

      const fetchedBeerDetails = res.data
      setBeerDetails(fetchedBeerDetails)
    } catch (error) {
      console.error('Error fetching beer details:', error)
    }
  }

  const backLink = '/'
  const forwardLink = '/find'
  const nameBackLink = 'Go Back'
  const nameForwardLink = 'Get all'

  return (
    <>
      {beerDetails ? (
        <div className={styles.container}>
          <div className={styles.fullBeerCard}>
            <div className={styles.beerCard}>
              <BeerCard beer={beerDetails} />
            </div>
            <div className={styles.brand}>
              <h2>Brand: {beerDetails.brandName}</h2>
              <p>
                <strong>Website: </strong>
                {beerDetails.url}{' '}
              </p>
              <p>
                <strong>Brand Description: </strong>
                {beerDetails.brandDescription}
              </p>
              <p>
                <strong>MainAddress: </strong>
                {beerDetails.mainAddress.country},{' '}
                {beerDetails.mainAddress.land}
                {beerDetails.mainAddress.city}, {beerDetails.mainAddress.street}{' '}
                {beerDetails.mainAddress.number}, PLZ:{' '}
                {beerDetails.mainAddress.plz}
              </p>
            </div>
            <div className={styles.navi}>
              <BackButton backLink={backLink} nameBackLink={nameBackLink} />
              <ForwardButton
                forwardLink={forwardLink}
                nameForwardLink={nameForwardLink}
              />
            </div>
          </div>
          <div className={styles.empty}></div>
        </div>
      ) : (
        <p>Loading beer details...</p>
      )}
    </>
  )
}
