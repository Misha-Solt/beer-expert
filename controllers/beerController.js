import { StatusCodes } from 'http-status-codes'
import { getBeerWithBrandService } from '../services/getBeerWithBrandService.js'

import Brand from '../models/Brand.js'
import beerSchema from '../models/Beer.js'

/**
 * List all Beers (without Brand Name)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const listBeers = async (req, res) => {
  try {
    const brands = await Brand.find()
    let allBeers = []
    brands.forEach((brand) => {
      // allBeers = [...allBeers, ...brand.beers]
      // allBeers.push(...brand.beers)
      allBeers = allBeers.concat(brand.beers)
    })

    return res.status(StatusCodes.OK).json(allBeers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * list all Beers with Brand Name
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const listBeersWithBrandName = async (req, res) => {
  try {
    let allBeers = await getBeerWithBrandService()

    return res.status(StatusCodes.OK).json(allBeers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * Controller function to get a random beer
 * @param {*} req
 * @param {*} res
 */
export const getRandomBeer = async (req, res) => {
  try {
    let allBeers = await getBeerWithBrandService()
    const randomBeerIndex = Math.floor(Math.random() * allBeers.length)
    const randomBeer = allBeers[randomBeerIndex]

    return res.status(StatusCodes.OK).json(randomBeer)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * Function to get Details about chosen beer
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getBeerDetails = async (req, res) => {
  const beerId = req.params.beerId

  try {
    const beer = await Brand.findOne({ 'beers._id': beerId }).populate('beers')
    //.exec()
    if (!beer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Beer not found' })
    }

    const selectedBeer = beer.beers.find(
      (beer) => beer._id.toString() === beerId
    )
    const beerWithBrand = {
      ...selectedBeer.toObject(),
      brandName: beer.brandName,
      brandDescription: beer.brandDescription,
      mainAddress: beer.mainAddress,
      url: beer.url,
    }

    return res.status(StatusCodes.OK).json(beerWithBrand)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * List all beers of One Brand (by Brand ID)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const listBeersByBrand = async (req, res) => {
  const brandId = req.params.brandId

  try {
    const brand = await Brand.findById(brandId)
    if (!brand) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Brand not found' })
    }

    const beers = brand.beers
    return res.status(StatusCodes.OK).json(beers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * Filter all beers by beerType
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const filterBeersByType = async (req, res) => {
  const beerType = req.query.beerType

  try {
    const brands = await Brand.find({ 'beers.beerType': beerType }) //.exec()
    const beers = brands.reduce((result, brand) => {
      const filteredBeers = brand.beers.filter(
        (beer) => beer.beerType === beerType //Beer Type here
      )
      return [...result, ...filteredBeers]
    }, [])

    return res.status(StatusCodes.OK).json(beers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * controller for getting enum values
 * @param {*} req
 * @param {*} res
 */
//Last improved version that fetches all the data from the beerSchema
export const getEnums = async (req, res) => {
  const enums = {}
  // Fetch the enum values for each property in the beerSchema
  Object.keys(beerSchema.paths).forEach((path) => {
    if (beerSchema.paths[path].instance === 'Array') {
      enums[path] = beerSchema.paths[path].caster.enumValues
    } else if (beerSchema.paths[path].enumValues) {
      enums[path] = beerSchema.paths[path].enumValues
    }
  })

  res.json(enums)
}

//   Improved version that shows enums, bt don't show Arrays of enums

// export const getEnums = async (req, res) => {
//   const enums = {}
//   Object.keys(beerSchema.paths).forEach((path) => {
//     if (beerSchema.paths[path].enumValues) {
//       enums[path] = beerSchema.paths[path].enumValues
//     }
//   })

//   res.json(enums)
// }

//Very first version that shows by type

// export const getEnums = async (req, res) => {
//   const { enumValues } = beerSchema.path('beerType')
//   res.json(enumValues)
// }

export const searchByName = async (req, res) => {
  const searchQuery = req.query.search
  try {
    const brands = await Brand.find({
      brandName: { $regex: searchQuery, $options: 'i' },
    })
    const beers = await Brand.aggregate([
      { $unwind: '$beers' },
      { $match: { 'beers.beerName': { $regex: searchQuery, $options: 'i' } } },
      { $replaceRoot: { newRoot: '$beers' } },
    ])

    const searchResults = [...brands, ...beers]
    return res.status(StatusCodes.OK).json(searchResults)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}
