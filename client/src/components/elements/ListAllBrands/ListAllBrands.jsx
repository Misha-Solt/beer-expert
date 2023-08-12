import React from 'react'

import BrandCard from '../../elements/BrandCard/BrandCard'
import styles from './listAllBrands.module.css'

export const ListAllBrands = ({ brands }) => {
  return (
    <div className={styles.container}>
      {brands && (
        <>
          {brands.map((brand) => (
            <div className={styles.element} key={`element${brand._id}`}>
              <BrandCard key={brand._id} brand={brand} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default ListAllBrands
