import './App.css'

import { Routes, Route } from 'react-router-dom'

// import Header from './components/Header/Header'
import MainLayout from './components/MainLayout/MainLayout'
import Menu from './components/Menu/Menu'

import AddBeerOrBrandPage from './components/AddBeerOrBrandPage/AddBeerOrBrandPage'
import AddBrand from './components/AddBrand/AddBrand'
import AddBeer from './components/AddBeer/AddBeer'

import ListAllBrands from './components/ListAllBrands/ListAllBrands'
import MoreAboutBeer from './components/MoreAboutBeer/MoreAboutBeer'
import FindPage from './components/FindPage/FindPage'

import RandomBeerPage from './components/RandomBeerPage/RandomBeerPage'
import Footer from './components/Footer/Footer'
import BeerDetails from './components/Details/BeerDetails'

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Menu />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/addBeerOrBrand" element={<AddBeerOrBrandPage />} />
        <Route path="/brands" element={<ListAllBrands />} />
        <Route path="/moreAboutBeer" element={<MoreAboutBeer />} />
        <Route path="/addBrand" element={<AddBrand />} />
        <Route path="/addBeer" element={<AddBeer />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/randomBeer" element={<RandomBeerPage />} />
        <Route path="/randomBeerDetails/:beerId" element={<BeerDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
