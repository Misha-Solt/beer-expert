import { useState } from 'react'
import styles from './randomButton.module.css'
import { Link, useNavigate } from 'react-router-dom'

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const RandomButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    setIsLoading(true)
    await delay(3500)
    setIsLoading(false)
    navigate('/randomBeer')
  }

  const buttonClassName = `${styles.button} ${isLoading ? styles.loading : ''}`

  return (
    <button className={buttonClassName} onClick={handleClick}>
      <Link className={styles.link}>
        <div className={styles.beerGlass}>
          <div id={styles.glass}>
            <div id={styles.beer}></div>
          </div>
          <div id={styles.handle}></div>
          <div id={styles.foam1}></div>
          <div id={styles.foam2}></div>
          <div id={styles.foam3}></div>
          <div id={styles.foam4}></div>
          <div id={styles.foam5}></div>
          <div id={styles.foamOut}></div>
          <div id={styles.foamIn}></div>
          <div id={styles.foamIn2}></div>
          <div id={styles.foamIn3}></div>
          <div id={styles.foamIn4}></div>
        </div>
        <div className={styles.emptyBeerGlass}>
          <div id={styles.emptyGlass}></div>
          <div id={styles.emptyHandle}></div>
        </div>
        <span className={styles.absolutely}>
          {isLoading ? 'Loading...' : 'Absolutely!'}
        </span>
      </Link>
    </button>
  )
}

export default RandomButton
