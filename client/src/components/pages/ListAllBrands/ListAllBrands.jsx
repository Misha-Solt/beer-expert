import React, { useState } from 'react'
import axios from 'axios'
import BrandCard from './BrandCard.jsx'

export const ListAllBrands = () => {
  const [brands, setBrands] = useState([])

  const refreshList = async () => {
    console.log('refreshing list')

    try {
      const res = await axios.get('http://localhost:3001/api/brands')
      setBrands(res.data)
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  return (
    <div>
      <h1>List of all brands</h1>
      {brands.map((brand) => (
        <BrandCard key={brand._id} brand={brand} />
      ))}
      <button onClick={refreshList}>Refresh List</button>
    </div>
  )
}

export default ListAllBrands
