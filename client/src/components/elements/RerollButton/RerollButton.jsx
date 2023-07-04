import React, { useState } from 'react'
import './rerollButton.css'

const RerollButton = () => {
  const [spinning, setSpinning] = useState(false)
  const handleClick = () => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
    }, 2000)
  }

  return (
    <button className="buttonRoll">
      <span
        className={`roulette ${spinning ? 'spinning' : ''}`}
        onClick={handleClick}
      ></span>
      <span className="textSpan">Reroll</span>
    </button>
  )
}

export default RerollButton
