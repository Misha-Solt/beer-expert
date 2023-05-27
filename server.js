import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3001

app.use(express.json())

// -------------------------------------
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  )
  .then(() => {
    console.log('Database connected! 😃')
  })
  .catch((error) => {
    console.log(error.message)
    console.log('🤨')
  })
// -------------------------------------

app.listen(port, () => {
  console.log(
    `The server is listening for requests on: http://localhost:${port}`
  )
})
