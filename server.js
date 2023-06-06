import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//import router modules into our server
import beerRoutes from './routes/beerRoutes.js'

dotenv.config()
const app = express()
const port = 3001

//allows to parse json info from http body to req.body
app.use(express.json())

app.use(cors())

// ------------------------------------- connecting to the database
=======
// --------------connecting to the database----------------------- 
>>>>>>> 6f34683f61131d968a0d9bb44b32680c498bb334
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
// ---------------------------------------------------------------

//start link for the server
app.use('/api', beerRoutes)

app.listen(port, () => {
  console.log(
    `The server is listening for requests on: http://localhost:${port}`
  )
})
