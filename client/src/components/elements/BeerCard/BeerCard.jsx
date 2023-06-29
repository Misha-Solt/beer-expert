const BeerCard = ({ beer }) => {
  return (
    <div>
      <div>
        <img src="https://picsum.photos/300/300" alt="beerPhoto"></img>
        <div>
          <h3>{beer.beerName}</h3>
          <p>{beer.beerDescription}</p>
          <div>
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
    </div>
  )
}

export default BeerCard
