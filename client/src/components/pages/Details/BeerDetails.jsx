import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function BeerDetails() {
  const { beerId } = useParams()
  const [beerDetails, setBeerDetails] = useState(null)

  useEffect(() => {
    fetchBeerDetails()
  })

  const fetchBeerDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/beers/${beerId}`)
      const fetchedBeerDetails = res.data
      setBeerDetails(fetchedBeerDetails)
    } catch (error) {
      console.error('Error fetching beer details:', error)
    }
  }

  return (
    <div>
      {beerDetails ? (
        <div>
          <h1>{beerDetails.beerName}</h1>
          <p>Type: {beerDetails.beerType}</p>
          <p>Description: {beerDetails.beerDescription}</p>
          <p>ABV: {beerDetails.alcoholByVolume}</p>
          <p>Color: {beerDetails.color}</p>
          <p>Mouthfeel: {beerDetails.mouthfeel}</p>
          <p>Aroma: {beerDetails.aroma}</p>
          <p>Average Rating: {beerDetails.avgRating}</p>
          <h2>Brand: {beerDetails.brandName}</h2>
          <p>Website: {beerDetails.url} </p>
          <p>Brand Description: {beerDetails.brandDescription}</p>
          <p>
            MainAddress: {beerDetails.mainAddress.country},{' '}
            {beerDetails.mainAddress.land}
            {beerDetails.mainAddress.city}, {beerDetails.mainAddress.street}{' '}
            {beerDetails.mainAddress.number}, PLZ: {beerDetails.mainAddress.plz}
          </p>
        </div>
      ) : (
        <p>Loading beer details...</p>
      )}
    </div>
  )
}
