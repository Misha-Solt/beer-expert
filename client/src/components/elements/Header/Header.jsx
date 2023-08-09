import { useEffect, useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import styles from './header.module.css'

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const wideScreen = screenWidth > 670

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <a href="/" className={styles.name}>
          beer-expert
        </a>
        {wideScreen && (
          <div className={styles.flag}>
            <LanguageSwitcher />
          </div>
        )}
      </div>
      <div className={styles.right}>
        {wideScreen && (
          <div className={styles.switch}>
            <ThemeSwitcher />
          </div>
        )}
        <div className={styles.login}>Login</div>
      </div>
      <div className={styles.menu}>
        <Dropdown />
      </div>
    </header>
  )
}

export default Header
