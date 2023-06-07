import React from 'react'
import AddBrand from '../AddBrand/AddBrand'
import { Link } from 'react-router-dom'
import AddBeer from '../AddBeer/AddBeer'

export default function AddBeerOrBrandPage() {
  return (
    <div>
      <Link to="/addBrand" element={<AddBrand />}>
        <button>Add Brand</button>
      </Link>
      <Link to="/addBeer" element={<AddBeer />}>
        <button>Add Beer</button>
      </Link>
    </div>
  )
}
