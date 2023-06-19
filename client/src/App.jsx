import './App.css'

import { Routes, Route } from 'react-router-dom'

// import Header from './components/Header/Header'
import MainLayout from './components/pages/MainLayout/MainLayout.jsx'
import Menu from './components/elements/Menu/Menu.jsx'

import AddBeerOrBrandPage from './components/pages/AddBeerOrBrandPage/AddBeerOrBrandPage.jsx'
import AddBrand from './components/pages/AddBrand/AddBrand.jsx'
import AddBeer from './components/pages/AddBeer/AddBeer.jsx'

import ListAllBrands from './components/pages/ListAllBrands/ListAllBrands.jsx'
import MoreAboutBeer from './components/pages/MoreAboutBeer/MoreAboutBeer.jsx'
import FindPage from './components/pages/FindPage/FindPage.jsx'

import RandomBeerPage from './components/pages/RandomBeerPage/RandomBeerPage.jsx'
import Footer from './components/elements/Footer/Footer.jsx'
import BeerDetails from './components/pages/Details/BeerDetails.jsx'

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
