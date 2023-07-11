import React, { useState } from 'react'
import axios from 'axios'
import BrandCard from '../ListAllBrands/BrandCard'
import BeerCard from '../../elements/BeerCard/BeerCard'

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/search?search=${searchQuery}`
      )
      setSearchResults(res.data)
    } catch (error) {
      console.error('Error searching:', error)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by brand or beer name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map((result) =>
          result.beerName ? (
            <BeerCard key={result._id} beer={result} />
          ) : (
            <BrandCard key={result._id} brand={result} />
          )
        )}
      </div>
    </div>
  )
}

export default SearchComponent
