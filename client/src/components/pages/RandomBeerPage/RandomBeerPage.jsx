// code with stored random beer that can be changed only by reroll button
import React, { useState, useEffect } from 'react'
import BeerCard from '../../elements/BeerCard/BeerCard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './randomBeerPage.module.css'
import BackButton from '../../elements/BackButton/BackButton'
import GetAllButton from '../../elements/GetAllButton/GetAllButton'
import RerollButton from '../../elements/RerollButton/RerollButton'

export default function RandomBeerPage() {
  const [randomBeer, setRandomBeer] = useState(null)
  const [beerId, setBeerId] = useState(null)

  useEffect(() => {
    const storedRandomBeer = localStorage.getItem('randomBeer')
    if (storedRandomBeer) {
      setRandomBeer(JSON.parse(storedRandomBeer))

      const { _id } = JSON.parse(storedRandomBeer)
      setBeerId(_id)
    } else {
      fetchRandomBeer()
    }
  }, [])

  const fetchRandomBeer = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/random-beer')
      const fetchedRandomBeer = res.data
      setRandomBeer(fetchedRandomBeer)
      setBeerId(fetchedRandomBeer._id) //set beer Id for finding details about beer by clicking 'More' button
      console.log(fetchedRandomBeer)
      localStorage.setItem('randomBeer', JSON.stringify(fetchedRandomBeer))
    } catch (error) {
      console.error('Error fetching random beer:', error)
    }
  }

  const rerollRandomBeer = () => {
    localStorage.removeItem('randomBeer')
    fetchRandomBeer()
  }

  return (
    <div className={styles.container}>
      <div className={styles.randomBeerPage}>
        <Link to={`/randomBeerDetails/${beerId}`} className={styles.card}>
          {randomBeer && <BeerCard beer={randomBeer} />}
        </Link>

        <button onClick={rerollRandomBeer}>PUSH</button>

        <RerollButton />

        <div className={styles.bottom}>
          <BackButton />
          <GetAllButton />
        </div>
      </div>
    </div>
  )
}

//Previous code of random beer? which changing by refreshing page and reroll button

// import React from 'react'
// import BeerCard from '../BeerCard/BeerCard'
// import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// export default function RandomBeerPage() {
//   const [randomBeer, setRandomBeer] = useState([])
//   const [beerId, setBeerId] = useState()

//   useEffect(() => {
//     fetchRandomBeer()
//   }, [])

//   const fetchRandomBeer = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/api/random-beer')
//       setRandomBeer(res.data)
//       setBeerId(res.data._id)
//     } catch (error) {
//       console.error('Error fetching random beer:', error)
//     }
//   }

//   return (
//     <div>
//       {randomBeer && <BeerCard beer={randomBeer} />}
//       <button onClick={fetchRandomBeer}>Reroll</button>
//       <button>
//         <Link to={`/randomBeerDetails/${beerId}`}>More</Link>
//       </button>
//       <button>
//         <Link to="/">Back</Link>
//       </button>
//       <button>{/* <Link to="/find">Find a Beer</Link> */}Find Beer</button>
//     </div>
//   )
// }
