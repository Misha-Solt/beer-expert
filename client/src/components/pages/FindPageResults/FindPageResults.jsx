import React from 'react'
import ListAllBrands from '../ListAllBrands/ListAllBrands'
import SearchComponent from '../SearchComponent/SearchComponent'
import GetAllBeers from '../GetAllBeers/GetAllBeers'

export default function FindPageResults({ searchResults, brands, beers }) {
  return (
    <div>
      <div>
        <SearchComponent searchResults={searchResults} />
      </div>
      <div>
        <ListAllBrands brands={brands} />
      </div>
      <div>
        <GetAllBeers beers={beers} />
      </div>
    </div>
  )
}
