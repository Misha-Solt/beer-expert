import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//import router modules into our server
import beerRoutes from './routes/beerRoutes.js'

//imports for locating our directory (for deployment)
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url) // get the current file location of server.js
const __dirname = dirname(__filename) //extract directory from that location.

dotenv.config()
const app = express()
const port = process.env.PORT || 3001

//allows to parse json info from http body to req.body
app.use(express.json())

app.use(cors())

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

app.use('/api/files', beerRoutes)

//the files inside the folder will be served by our server
app.use('/uploads', express.static('./uploads'))

//serve our files statically
app.use(express.static(path.join(__dirname, 'client/build')))
//any other request made serve the index.html of our production build frontend.
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})

app.listen(port, () => {
  console.log(
    `The server is listening for requests on: http://localhost:${port}`
  )
})
