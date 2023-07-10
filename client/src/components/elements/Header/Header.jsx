import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <a href="/" className={styles.name}>
          beer-expert
        </a>
        <div className={styles.flag}>
          <LanguageSwitcher />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.switch}>
          <ThemeSwitcher />
        </div>
        <div className={styles.login}>Login</div>
      </div>
    </header>
  )
}

export default Header
