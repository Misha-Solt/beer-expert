import React, { useState } from 'react'
import axios from 'axios'

export const ListAllBrands = () => {
  const [brands, setBrands] = useState([])

  const refreshList = async () => {
    console.log('refreshing list')

    const res = await axios.get('http://localhost:3001/api/brands')
    setBrands(res.data)
  }
  return (
    <div>
      <h1>List of all brands</h1>
      <ul>
        {brands.map((brand) => (
          <li key={brand._id}>{brand.brandName}</li>
        ))}
      </ul>
      <button onClick={refreshList}>Refresh List</button>
    </div>
  )
}

export default ListAllBrands
