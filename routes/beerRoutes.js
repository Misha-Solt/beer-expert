import express from 'express'

//functions for listing beers imported from BEER controller
import {
  listBeers,
  listBeersByBrand,
  getBeerDetails,
  listBeersWithBrandName,
  filterBeersByType,
} from '../controllers/beerController.js'

//functions for creating and listing brands imported from BRAND controller
import {
  listBeerBrands,
  addBeerBrand,
  addBeer,
} from '../controllers/brandController.js'

const beerRoutes = express.Router()

//GET http://localhost:3001/api/beers-no-brand
//list all beers
beerRoutes.get('/beers-no-brand', listBeers)

//GET http://localhost:3001/api/beers
//list all beers with brand name
beerRoutes.get('/beers', listBeersWithBrandName)

//GET http://localhost:3001/api/beers/:beerId
//list a chosen beer with Brand details and Beer details
beerRoutes.get('/beers/:beerId', getBeerDetails)

//GET http://localhost:3001/api/brands
//list all Brands
beerRoutes.get('/brands', listBeerBrands)

//GET http://localhost:3001/api/beers-by-brand/:brandId
//list all Beers by one Brand
beerRoutes.get('/beers-by-brand/:brandId', listBeersByBrand)

//POST http://localhost:3001/api/add-brand
//add a new brand
beerRoutes.post('/add-brand', addBeerBrand)

//PATCH http://localhost:3001/api/add-beer/:id
//update Brand by Adding a new beer
beerRoutes.patch('/add-beer/:id', addBeer)

//Searching (filtering) Beer Routes

// Find Beer by beerType
//GET http://localhost:3001/api/beers/by-type/type?beerType=WEIZEN
beerRoutes.get('/beers/by-type/type', filterBeersByType)

export default beerRoutes
