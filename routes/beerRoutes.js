import express from 'express'
import multer from 'multer'

//functions for listing beers imported from BEER controller
import {
  listBeers,
  listBeersByBrand,
  getBeerDetails,
  listBeersWithBrandName,
  filterBeersByType,
  getRandomBeer,
  getEnums,
  searchByName,
} from '../controllers/beerController.js'

//functions for creating and listing brands imported from BRAND controller
import {
  listBeerBrands,
  addBeerBrand,
  addBeer,
  // uploadImg,
} from '../controllers/brandController.js'

const beerRoutes = express.Router()

//GET http://localhost:3001/api/search/:searchTerm
//Search for a beer by name
beerRoutes.get('/search', searchByName)

//GET http://localhost:3001/api/enum-values
//List of all enum values
beerRoutes.get('/enum-values', getEnums)

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

//POST http://localhost:3001/api/add-brand
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

// -------------------------------------------------
//Searching (filtering) Beer Routes
// Find Beer by beerType
//GET http://localhost:3001/api/beers/by-type/type?beerType=WEIZEN
beerRoutes.get('/beers/by-type/type', filterBeersByType)
// -------------------------------------------------

//Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  //name of files must be unique
  filename: (req, file, cb) => {
    console.log('mimetype file', file.mimetype)
    const ext = file.mimetype.split('/')[1]
    const originalImgName = file.originalname.split('.')[0]
    // create a unique name by (original name) + (-) + (date n milliseconds) + (.extension)
    cb(null, `${originalImgName}-${Date.now()}.${ext}`)
  },
})
//initialize the multer middleware here
const upload = multer({ storage: storage })

//the upload.single('image') is the middleware that will handle the file upload and 'image' stands for the name='image' in UploadForm component

beerRoutes.patch('/add-beer/:id', upload.single('image'), addBeer)

export default beerRoutes
