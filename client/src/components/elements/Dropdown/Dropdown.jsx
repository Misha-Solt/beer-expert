import { useState } from 'react'
import styles from './dropdown.module.css'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const buttonClassName = `${styles.toggle} ${isOpen ? styles.on : ''}`

  return (
    <div>
      <a href="#menu" className={buttonClassName} onClick={toggleMenu}>
        <span className={styles.toggleSpan}></span>
      </a>
      <div className={styles.menu} id="menu">
        <div className={styles.list}>
          <p>Style & Login</p>
          <LanguageSwitcher />
          <ThemeSwitcher />
          <div className={styles.login}>Login</div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
