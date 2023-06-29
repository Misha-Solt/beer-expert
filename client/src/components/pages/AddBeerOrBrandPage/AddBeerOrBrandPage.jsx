import React from 'react'
import AddBrand from '../AddBrand/AddBrand.jsx'
import { Link } from 'react-router-dom'
import AddBeer from '../AddBeer/AddBeer.jsx'
import styles from './addBeerOrBrandPage.module.css'

export default function AddBeerOrBrandPage() {
  return (
    <div className={styles.addButtonBox}>
      <Link to="/addBrand" element={<AddBrand />}>
        <button>Add Brand</button>
      </Link>
      <Link to="/addBeer" element={<AddBeer />}>
        <button>Add Beer</button>
      </Link>
    </div>
  )
}
