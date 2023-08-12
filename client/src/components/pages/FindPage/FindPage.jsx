import React, { useState, useEffect } from 'react'
import styles from './findPage.module.css'
import axios from 'axios'
import FindPageResults from '../../elements/FindPageResults/FindPageResults'

export default function FindBrandOrBeer() {
  const [searchQuery, setSearchQuery] = useState('')

  //this States answers for the content that will be shown in a page
  const [beers, setBeers] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [brands, setBrands] = useState([])

  //On page load show GetAllBeers Component
  useEffect(() => {
    showBeers()
  }, [])

  //Function to show all beers from GetAllBeers Component
  const showBeers = async () => {
    try {
      const res = await axios.get('/api/beers')

      setSearchResults(null) //set search results to null to hide the search results
      setBrands(null) //set brands to null to hide the list of all brands
      setBeers(res.data)
    } catch (error) {
      console.error('Error fetching beers:', error)
    }
  }

  //Function to show all brands from ListAllBrands Component
  const showBrands = async () => {
    try {
      const res = await axios.get('/api/brands')
      setSearchResults(null) //set search results to null to hide the search results
      setBeers(null) //set beers to null to hide the list of all beers
      setBrands(res.data)
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  //Function to show search results from SearchComponent
  const handleShowingResults = async () => {
    try {
      const res = await axios.get(`/api/search?search=${searchQuery}`)

      setBrands(null) //set brands to null to hide the list of all brands
      setBeers(null) //set beers to null to hide the list of all beers
      setSearchResults(res.data)
    } catch (error) {
      console.error('Error searching:', error)
    }
  }

  // const inputRef = useRef(null)

  const handlePressEnterOnSearch = (event) => {
    if (event.key === 'Enter') {
      handleShowingResults()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.controlPanel}>
        {/* buttons for filtering */}
        <div className={styles.buttons}>
          {/* button for listing GetAllBeers Component */}
          <button className={styles.showBtn} onClick={showBeers}>
            Show all Beers
          </button>
          {/* button for listing ListALLBrands Component */}
          <button className={styles.showBtn} onClick={showBrands}>
            Show all Brands
          </button>
        </div>
        {/* search bar for searching for brands or beers */}
        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by brand or beer name"
            value={searchQuery}
            onKeyDown={handlePressEnterOnSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleShowingResults} className={styles.searchBtn}>
            Search
          </button>
        </div>
      </div>
      <div className={styles.searchResults}>
        <FindPageResults
          searchResults={searchResults}
          brands={brands}
          beers={beers}
        />
      </div>
      <div className={styles.empty}></div>
    </div>
  )
}
