import { useState } from 'react'
import styles from './rerollButton.module.css'

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

//Randome color for a beer

const changeBackgroundColor = () => {
  const colors = [
    '#effd5f',
    '#fde64b',
    '#fcef87',
    '#e28900',
    '#f9a600',
    '#420d09',
    '#963601',
    '#570b03',
    '#350909',
  ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex]
  document.documentElement.style.setProperty('--random-beer-color', randomColor)
}

const RerollButton = ({ rerollRandomBeer }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await delay(3000)
    setIsLoading(false)
    rerollRandomBeer()
    await delay(100)
    changeBackgroundColor()
  }

  const buttonClassName = `${styles.button} ${isLoading ? styles.loading : ''}`

  return (
    <button className={buttonClassName} onClick={handleClick}>
      <div className={styles.beerGlass}>
        <div id={styles.glass}>
          <div id={styles.beer}></div>
        </div>
        <div id={styles.foam}>
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
        <div id={styles.handle}></div>
      </div>
      <div className={styles.emptyBeerGlass}>
        <div id={styles.emptyGlass}></div>
        <div id={styles.emptyHandle}></div>
      </div>
      <span className={styles.text}>{isLoading ? 'Loading...' : 'Reroll'}</span>
    </button>
  )
}

export default RerollButton
