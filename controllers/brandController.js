import { StatusCodes } from 'http-status-codes'
import Brand from '../models/Brand.js'

/**
 * Controller method to list all brands
 * @param {*} req
 * @param {*} res
 */
export const listBeerBrands = async (req, res) => {
  try {
    const brands = await Brand.find({})
    res.status(StatusCodes.OK).json(brands)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * Controller method to create new brand
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const addBeerBrand = async (req, res) => {
  try {
    const brand = await Brand.create({
      brandName: req.body.brandName,
      url: req.body.url,
      brandDescription: req.body.brandDescription,
      mainAddress: req.body.mainAddress,
    })
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Brand created', brand })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * Controller method to add a new beer to a brand
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const addBeer = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          beers: {
            beerName: req.body.beerName,
            beerType: req.body.beerType,
            fermentedType: req.body.fermentedType,
            beerDescription: req.body.beerDescription,
            alcoholByVolume: req.body.alcoholByVolume,
            color: req.body.color,
            mouthfeel: req.body.mouthfeel,
            aroma: req.body.aroma,
            advRating: req.body.advRating,
          },
        },
      },
      { new: true }
    )
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Beer added', updatedBrand })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}
