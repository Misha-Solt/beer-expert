import styles from './mainLayout.module.css'
import { Link } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <h1 className={styles.greeting}>Hi friend!</h1>
      <h3 className={styles.question}>
        Today is a great time for a <span className={styles.beer}>beer;)</span>{' '}
        <br /> Isn't it?
      </h3>
      <button className={styles.button}>
        <Link to="/randomBeer" className={styles.link}>
          Absolutely!
        </Link>
      </button>
    </div>
  )
}

export default MainLayout
