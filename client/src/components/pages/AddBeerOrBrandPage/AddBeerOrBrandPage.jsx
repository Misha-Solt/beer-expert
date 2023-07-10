import React from 'react'
import AddBrand from '../AddBrand/AddBrand.jsx'
import { Link } from 'react-router-dom'
import AddBeer from '../AddBeer/AddBeer.jsx'
import styles from './addBeerOrBrandPage.module.css'

export default function AddBeerOrBrandPage() {
  return (
    <div className={styles.container}>
      <div className={styles.addButtonBox}>
        <div className={styles.btnBox}>
          <Link to="/addBrand" element={<AddBrand />}>
            <button className={styles.addButton}>Add Brand</button>
          </Link>
          <p>
            Here you can add a Brand that creates your favorite wonderful Beer,
            but it is not in our data base right now
          </p>
        </div>
        <div className={styles.btnBox}>
          <Link to="/addBeer" element={<AddBeer />}>
            <button className={styles.addButton}>Add Beer</button>
          </Link>
          <p>
            Here you can add a Beer, but check it out, Beer can be added only to
            existing Brand.
          </p>
        </div>
      </div>
    </div>
  )
}
