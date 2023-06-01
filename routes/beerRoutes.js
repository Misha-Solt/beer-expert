import express from 'express'

//functions for listing beers imported from BEER controller
import { listBeers } from '../controllers/beerController.js'

//functions for creating and listing brands imported from BRAND controller
import {
  listBeerBrands,
  addBeerBrand,
  addBeer,
} from '../controllers/brandController.js'

const beerRoutes = express.Router()

//GET http://localhost:3001/api/beers
//list all beers
beerRoutes.get('/beers', listBeers)

//GET http://localhost:3001/api/brands
//list all Brands
beerRoutes.get('/brands', listBeerBrands)

//POST http://localhost:3001/api/add-brand
//add a new brand
beerRoutes.post('/add-brand', addBeerBrand)

//PATCH http://localhost:3001/api/add-beer/:id
//update Brand by Adding a new beer
beerRoutes.patch('/add-beer/:id', addBeer)

export default beerRoutes
