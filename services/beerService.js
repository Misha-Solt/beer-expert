import Brand from '../models/Brand.js'

export const getBeerWithBrandService = async () => {
  try {
    const brands = await Brand.find().exec()
    let allBeers = []

    brands.forEach((brand) => {
      const brandName = brand.brandName
      brand.beers.forEach((beer) => {
        const fullBeerName = `${brandName} ${beer.beerName}`
        const beerWithBrandName = {
          ...beer.toObject(),
          brandName: brandName,
          fullBeerName: fullBeerName,
        }
        allBeers.push(beerWithBrandName)
      })
    })

    return allBeers
  } catch (error) {
    throw error
  }
}
