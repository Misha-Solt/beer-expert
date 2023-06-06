import './App.css'
import AddBeerBrand from './components/AddBeerBrand/AddBeerBrand'
import ListAllBrands from './components/ListAllBrands/ListAllBrands'
// import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header>Beers adding tool will be here!</header>
      <AddBeerBrand />
      <ListAllBrands />

      {/* <Routes>
        <Route path="/addBeerBrand" element={<AddBeerBrand />} />
      </Routes> */}
    </div>
  )
}

export default App
