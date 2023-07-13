// import React from 'react'
// import BeerCard from '../../elements/BeerCard/BeerCard.jsx'
// import styles from './brandCard.module.css'

// const BrandCard = ({ brand }) => {
//   return (
//     <div className={styles.brandListContainer}>
//       <h2>{brand.brandName}</h2>
//       <p>URL: {brand.url}</p>
//       <p>Description: {brand.brandDescription}</p>
//       <p>
//         Main Address: {brand.mainAddress.street}, {brand.mainAddress.city},{' '}
//         {brand.mainAddress.country}
//       </p>
//       <h3>Beers:</h3>
//       {brand.beers.map((beer) => (
//         <BeerCard key={beer._id} beer={beer} />
//       ))}
//     </div>
//   )
// }

// export default BrandCard

//NEW UPDATED BRAND CARD for resolving search results

import React from 'react'
import BeerCard from '../../elements/BeerCard/BeerCard.jsx'
import styles from './brandCard.module.css'

const BrandCard = ({ brand }) => {
  if (!brand || !brand.brandName || !brand.url) {
    // If brand or essential brand data is missing, we can display a loading state (we need to add that here) or return null
    return null
  }

  const { brandName, url, brandDescription, mainAddress, beers } = brand

  return (
    <div className={styles.brandListContainer}>
      <h2>{brandName}</h2>
      <p>URL: {url}</p>
      {brandDescription && <p>Description: {brandDescription}</p>}
      {mainAddress && (
        <p>
          Main Address: {mainAddress.street}, {mainAddress.city},{' '}
          {mainAddress.country}
        </p>
      )}
      {beers && beers.length > 0 && (
        <>
          <h3>Beers:</h3>
          {beers?.map((beer) => (
            <BeerCard key={beer._id} beer={beer} />
          ))}
        </>
      )}
    </div>
  )
}

export default BrandCard
