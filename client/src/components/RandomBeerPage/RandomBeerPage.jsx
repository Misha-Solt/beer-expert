//code with stored random beer that can be changed only by reroll button
import React, { useState, useEffect } from 'react'
import BeerCard from '../BeerCard/BeerCard'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function RandomBeerPage() {
  const [randomBeer, setRandomBeer] = useState(null)

  useEffect(() => {
    const storedRandomBeer = localStorage.getItem('randomBeer')
    if (storedRandomBeer) {
      setRandomBeer(JSON.parse(storedRandomBeer))
    } else {
      fetchRandomBeer()
    }
  }, [])

  const fetchRandomBeer = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/random-beer')
      const fetchedRandomBeer = res.data
      setRandomBeer(fetchedRandomBeer)
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
    <div>
      {randomBeer && <BeerCard beer={randomBeer} />}
      <button onClick={rerollRandomBeer}>Reroll</button>
      <button>{/* <Link to="/randomBeerDetails">More</Link> */}More</button>
      <button>
        <Link to="/">Back</Link>
      </button>
      <button>
        <Link to="/find">Find a Beer</Link>
      </button>
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

//   useEffect(() => {
//     fetchRandomBeer()
//   }, [])

//   const fetchRandomBeer = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/api/random-beer')
//       setRandomBeer(res.data)
//     } catch (error) {
//       console.error('Error fetching random beer:', error)
//     }
//   }

//   return (
//     <div>
//       {randomBeer && <BeerCard beer={randomBeer} />}
//       <button onClick={fetchRandomBeer}>Reroll</button>
//       <button>
//         <Link
//           to={{
//             pathname: '/randomBeerDetails',
//             state: { beerId: randomBeer._id },
//           }}
//         >
//           More
//         </Link>
//       </button>
//       <button>
//         <Link to="/">Back</Link>
//       </button>
//       <button>{/* <Link to="/find">Find a Beer</Link> */}Find Beer</button>
//     </div>
//   )
// }
