import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

import Brand from '../models/Brand.js'

export const listBeers = async (req, res) => {
  try {
    const brands = await Brand.find().exec()
    let allBeers = []
    brands.forEach((brand) => {
      allBeers = [...allBeers, ...brand.beers]
    })

    return res.status(StatusCodes.OK).json(allBeers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}
