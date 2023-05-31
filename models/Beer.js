import { Schema } from 'mongoose'

export const beerSchema = new Schema({
  beerName: { type: String, required: true },
  beerType: {
    type: String,
    required: true,
    enum: [
      'WEIZEN',
      'SCHWARZ',
      'HLAGER',
      'EXPORT',
      'DLAGER',
      'KOELSCH',
      'WBOCK',
      'EBOCK',
      'BOCK',
      'BERLINERWEIS',
      'ALT',
      'PILS',
      'ZOIGL',
      'MAERZEN',
      'RAUCH',
      'STOUT',
      'PORTER',
      'PALEALE',
      'ZWICKEL',
      'RADLER',
    ],
  },
  fermentedType: {
    type: String,
    required: true,
    enum: ['TOP', 'BOTTOM', 'BOTH'],
  },
  beerDescription: { type: String, required: false },
  abv: { type: Number, required: true },
  color: { type: string, enum: ['LIGHT', 'DARK'], required: true }, //Add all others
  mouthfeel: {
    type: String,
    enum: ['FRESH', 'DRY', 'FULL-BODIED'],
    default: 'FULL-BODIED',
    required: true,
  }, //Add all others
  aroma: {
    type: String,
    enum: ['MILD', 'MALTY', 'FRUIT', 'HOPPY'],
    default: 'HOPPY',
    required: true,
  },
  avgRating: { type: Number, min: 1, max: 10 },
})
