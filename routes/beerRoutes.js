import express from 'express'

//functions for listing beers imported from BEER controller
import {
  listBeers,
  listBeersByBrand,
  getBeerDetails,
  listBeersWithBrandName,
  filterBeersByType,
  getRandomBeer,
} from '../controllers/beerController.js'

//functions for creating and listing brands imported from BRAND controller
import {
  listBeerBrands,
  addBeerBrand,
  addBeer,
} from '../controllers/brandController.js'

const beerRoutes = express.Router()

//GET http://localhost:3001/api/beers-no-brand
//List of all beers
beerRoutes.get('/beers-no-brand', listBeers)

//GET http://localhost:3001/api/beers
//List of all beers with brand name
beerRoutes.get('/beers', listBeersWithBrandName)

//GET http://localhost:3001/api/beers/:beerId
//Detailed description of the selected beer (with brand information)
beerRoutes.get('/beers/:beerId', getBeerDetails)

//GET http://localhost:3001/api/brands
//List of all Brands (full information)
beerRoutes.get('/brands', listBeerBrands)

//GET http://localhost:3001/api/beers-by-brand/:brandId
//List of all Beers by one Brand
beerRoutes.get('/beers-by-brand/:brandId', listBeersByBrand)

//GET http://localhost:3001/api/random-beer
//Random beer button
beerRoutes.get('/random-beer', getRandomBeer)

//????
//http://localhost:3001/api/brands/:brandId
//Detailed description of the selected brand (with all beers information)
//????

//POST http://localhost:3001/api/add-brand  ???http://localhost:3001/api/brands/create
//Add a new brand name
// {
//   "brandName": "Brand name",
//   "url": "https://www.muster.de",
//   "brandDescription": "Brand description...",
//   "mainAddress": {
//     "street":"Street name",
//     "number":"Build number",
//     "plz":"Postal code",
//     "country":"Name of the country",
//     "latitude":00.00,
//     "longitude":00.00
//     },
//   "beers": []
// }

beerRoutes.post('/add-brand', addBeerBrand)

//PATCH http://localhost:3001/api/add-beer/:id ???http://localhost:3001/api/beers/create
//Add a new beer (Update Brand by Adding a new beer)
// {
//   "beerName":"Weissbier",
//   "beerType": "WEIZEN",
//   "fermentedType": "TOP",
//   "beerDescription":"The No. 1 Weissbier in Germany and one of the world’s favourites. Naturally cloudy and shining silky-gold in the glass under a really strong head of foam. At the first mouthful this weissbier classic has a mild aroma of banana. Finer palates detect a trace of mango and pineapple and the balance between sweet and bitter. Beer connoisseurs appreciate the fine note of yeast and the mild but sparkling mix of aromas. It is a typical beer garden beer, which brings people together all over the world.",
//   "alcoholByVolume":"5.5",
//   "color":"GOLD",
//   "mouthfeel": "SWEET",
//   "aroma": "FRUITY"
//   "advRaiting": "9"
// }

beerRoutes.patch('/add-beer/:id', addBeer)

// -------------------------------------------------
//Searching (filtering) Beer Routes
// Find Beer by beerType
//GET http://localhost:3001/api/beers/by-type/type?beerType=WEIZEN
beerRoutes.get('/beers/by-type/type', filterBeersByType)
// -------------------------------------------------

export default beerRoutes
