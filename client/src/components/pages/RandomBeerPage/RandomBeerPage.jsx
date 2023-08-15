// code with stored random beer that can be changed only by reroll button
import React, { useState, useEffect } from 'react'
import BeerCard from '../../elements/BeerCard/BeerCard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './randomBeerPage.module.css'
import BackButton from '../../elements/BackButton/BackButton'
import ForwardButton from '../../elements/ForwardButton/ForwardButton'
import RerollButton from '../../elements/RerollButton/RerollButton'

export default function RandomBeerPage() {
  const [randomBeer, setRandomBeer] = useState(null)
  const [beerId, setBeerId] = useState(null)

  useEffect(() => {
    const storedRandomBeer = localStorage.getItem('randomBeer')
    if (storedRandomBeer) {
      setRandomBeer(JSON.parse(storedRandomBeer))

      const { _id } = JSON.parse(storedRandomBeer)
      setBeerId(_id)
    } else {
      fetchRandomBeer()
    }
  }, [])

  const fetchRandomBeer = async () => {
    try {
      const res = await axios.get('/api/random-beer')
      const fetchedRandomBeer = res.data
      setRandomBeer(fetchedRandomBeer)
      setBeerId(fetchedRandomBeer._id) //set beer Id for finding details about beer by clicking 'More' button
      console.log(fetchedRandomBeer)
      localStorage.setItem('randomBeer', JSON.stringify(fetchedRandomBeer))
    } catch (error) {
      console.error('Error fetching random beer:', error)
    }
  }

  const rerollRandomBeer = () => {
    localStorage.removeItem('randomBeer')
    fetchRandomBeer()
  }

  const backLink = '/'
  const forwardLink = '/find'
  const nameBackLink = 'Go Back'
  const nameForwardLink = 'Get all'

  return (
    <div className={styles.container}>
      <div className={styles.randomBeerPage}>
        <Link to={`/beerDetails/${beerId}`} className={styles.card}>
          {randomBeer && <BeerCard beer={randomBeer} />}
        </Link>
        <RerollButton rerollRandomBeer={rerollRandomBeer} />
        <div className={styles.bottom}>
          <BackButton backLink={backLink} nameBackLink={nameBackLink} />
          <ForwardButton
            forwardLink={forwardLink}
            nameForwardLink={nameForwardLink}
          />
        </div>
        <div className={styles.empty}></div>
      </div>
    </div>
  )
}
