import React, { useState } from 'react'
import ListAllBrands from '../ListAllBrands/ListAllBrands'
import styles from './findPage.module.css'
import SearchComponent from '../SearchComponent/SearchComponent'

export default function FindBrandOrBeer() {
  const [brands, setBrands] = useState([])

  const handleSearch = (searchResults) => {
    setBrands(searchResults)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className={styles.ListAllBrands}>
        <ListAllBrands brands={brands} />
      </div>
    </div>
  )
}
