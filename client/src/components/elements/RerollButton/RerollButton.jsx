import React, { useState } from 'react'
import styles from './rerollButton.module.css'

const RerollButton = () => {
  const [spinning, setSpinning] = useState(false)

  const handleClick = () => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
    }, 2000)
    //put function
  }

  const btnClass = `${styles.btnRoll} ${spinning ? 'spinning' : ''}`

  return (
    <button className={btnClass} onClick={handleClick}>
      <span>{spinning ? 'Seeking...' : 'Suggest more'}</span>
      {/* <span className="textSpan">Reroll</span> */}
    </button>
  )
}

export default RerollButton
