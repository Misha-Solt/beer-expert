import BeerCard from '../../elements/BeerCard/BeerCard.jsx'
import styles from './brandCard.module.css'

const BrandCard = ({ brand }) => {
  if (!brand || !brand.brandName || !brand.url) {
    // If brand or essential brand data is missing, we can display a loading state (we need to add that here) or return null
    return null
  }

  const { brandName, url, brandDescription, mainAddress, beers } = brand

  return (
    <div className={styles.brandCardContainer}>
      <h2>{brandName}</h2>
      <p>
        <strong>URL: </strong>
        {url}
      </p>
      {brandDescription && (
        <p>
          <strong>Description:</strong>
          {brandDescription}
        </p>
      )}
      {mainAddress && (
        <p>
          <strong>Main Address:</strong>
          {mainAddress.street}, {mainAddress.city}, {mainAddress.country}
        </p>
      )}
      {beers && beers.length > 0 && (
        <>
          <h3>Beers:</h3>
          {beers?.map((beer) => (
            <div className={styles.element} key={`element${beer._id}`}>
              <BeerCard key={beer._id} beer={beer} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default BrandCard
