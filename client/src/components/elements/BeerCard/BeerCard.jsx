import styles from './beerCard.module.css'

const BeerCard = ({ beer }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        // src={require('../../../data/beerImages/beer.png')}
        src={beer.beerImg}
        alt="beerPhoto"
      />
      <div>
        <h2>{beer.beerName}</h2>
        <h5>{beer.beerDescription}</h5>
        <div className={styles.options}>
          <p>Beer Type: {beer.beerType}</p>
          <p>Fermented Type: {beer.fermentedType}</p>
          <p>Description: </p>
          <p>ABV: {beer.alcoholByVolume}</p>
          <p>Color: {beer.color}</p>
          <p>Mouthfeel: {beer.mouthfeel}</p>
          <p>Aroma: {beer.aroma}</p>
          <p>Average Rating: {beer.avgRating}</p>
        </div>
      </div>
    </div>
  )
}

export default BeerCard
