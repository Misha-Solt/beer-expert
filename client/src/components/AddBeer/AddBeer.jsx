import 'bootstrap/dist/css/bootstrap.min.css'
import './addBeer.module.css'
import React, { useState, useEffect } from 'react'

const AddBeerForm = () => {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [enumValues, setEnumValues] = useState({})

  const [beerData, setBeerData] = useState({
    beerName: '',
    beerType: '',
    fermentedType: '',
    beerDescription: '',
    alcoholByVolume: '',
    color: [],
    mouthfeel: [],
    aroma: [],
    avgRating: '',
  })

  useEffect(() => {
    fetchBrands()
    fetchEnumValues()
  }, [])

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/brands')
      const data = await response.json()
      setBrands(data)
    } catch (error) {
      console.log('Error fetching brands:', error)
    }
  }

  const fetchEnumValues = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/enum-values')
      const data = await response.json()
      setEnumValues(data)
    } catch (error) {
      console.log('Error fetching enum values:', error)
    }
  }

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value)
  }

  const handleInputChange = (event) => {
    setBeerData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:3001/api/add-beer/${selectedBrand}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(beerData),
        }
      )

      const data = await response.json()
      console.log('Beer added:', data)
      // Reset form data
      setBeerData({
        beerName: '',
        beerType: '',
        fermentedType: '',
        beerDescription: '',
        alcoholByVolume: '',
        color: [],
        mouthfeel: [],
        aroma: [],
        avgRating: '',
      })
    } catch (error) {
      console.log('Error adding beer:', error)
    }
  }

  const generateAromaColorMouthfeelOptions = (property) => {
    if (enumValues[property]) {
      return enumValues[property].map((value) => (
        <label key={value} className="checkbox-label">
          <input
            type="checkbox"
            name={property}
            value={value}
            checked={beerData[property].includes(value)}
            onChange={handleCheckboxChange}
          />
          {value}
        </label>
      ))
    }
    return null
  }

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target
    const isChecked = event.target.checked

    setBeerData((prevData) => {
      if (isChecked) {
        // Add the value to the array if it's checked
        return {
          ...prevData,
          [name]: [...prevData[name], value],
        }
      } else {
        // Remove the value from the array if it's unchecked
        return {
          ...prevData,
          [name]: prevData[name].filter((item) => item !== value),
        }
      }
    })
  }

  const generateOptions = (property) => {
    if (enumValues[property]) {
      return enumValues[property].map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))
    }
    return null
  }

  return (
    <div className="container mt-5">
      <h2>Add Beer</h2>
      <select
        className="form-select mb-3"
        value={selectedBrand}
        onChange={handleBrandChange}
      >
        <option value="">Select a brand</option>
        {brands.map((brand) => (
          <option key={brand._id} value={brand._id}>
            {brand.brandName}
          </option>
        ))}
      </select>
      {selectedBrand && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="beerName"
              placeholder="Beer Name"
              value={beerData.beerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="beerType"
              value={beerData.beerType}
              onChange={handleInputChange}
            >
              <option value="">Select beer type</option>
              {generateOptions('beerType')}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="fermentedType"
              value={beerData.fermentedType}
              onChange={handleInputChange}
            >
              <option value="">Select fermented type</option>
              {generateOptions('fermentedType')}
            </select>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="beerDescription"
              placeholder="Beer Description"
              value={beerData.beerDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="alcoholByVolume"
              placeholder="Alcohol By Volume"
              value={beerData.alcoholByVolume}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Color:</label>
            <div>{generateAromaColorMouthfeelOptions('color')}</div>
          </div>
          <div className="mb-3">
            <label className="mb-2">Mouthfeel:</label>
            <div>{generateAromaColorMouthfeelOptions('mouthfeel')}</div>
          </div>
          <div className="mb-3">
            <label className="mb-2">Aroma:</label>
            <div>{generateAromaColorMouthfeelOptions('aroma')}</div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Beer
          </button>
        </form>
      )}
    </div>
  )
}

export default AddBeerForm

//no Bootstrap styles
// import React, { useState, useEffect } from 'react'

// const AddBeerForm = () => {
//   const [brands, setBrands] = useState([])
//   const [selectedBrand, setSelectedBrand] = useState('')
//   const [enumValues, setEnumValues] = useState({})

//   const [beerData, setBeerData] = useState({
//     beerName: '',
//     beerType: '',
//     fermentedType: '',
//     beerDescription: '',
//     alcoholByVolume: '',
//     color: [],
//     mouthfeel: [],
//     aroma: [],
//     avgRating: '',
//   })

//   useEffect(() => {
//     fetchBrands()
//     fetchEnumValues()
//   }, [])

//   const fetchBrands = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/brands')
//       const data = await response.json()
//       setBrands(data)
//     } catch (error) {
//       console.log('Error fetching brands:', error)
//     }
//   }

//   const fetchEnumValues = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/enum-values')
//       const data = await response.json()
//       setEnumValues(data)
//     } catch (error) {
//       console.log('Error fetching enum values:', error)
//     }
//   }

//   const handleBrandChange = (event) => {
//     setSelectedBrand(event.target.value)
//   }

//   const handleInputChange = (event) => {
//     setBeerData((prevData) => ({
//       ...prevData,
//       [event.target.name]: event.target.value,
//     }))
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/add-beer/${selectedBrand}`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(beerData),
//         }
//       )

//       const data = await response.json()
//       console.log('Beer added:', data)
//       // Reset form data
//       setBeerData({
//         beerName: '',
//         beerType: '',
//         fermentedType: '',
//         beerDescription: '',
//         alcoholByVolume: '',
//         color: [],
//         mouthfeel: [],
//         aroma: [],
//         avgRating: '',
//       })
//     } catch (error) {
//       console.log('Error adding beer:', error)
//     }
//   }
//   const generateAromaColorMouthfeelOptions = (property) => {
//     if (enumValues[property]) {
//       return enumValues[property].map((value) => (
//         <label key={value}>
//           <input
//             type="checkbox"
//             name={property}
//             value={value}
//             checked={beerData[property].includes(value)}
//             onChange={handleCheckboxChange}
//           />
//           {value}
//         </label>
//       ))
//     }
//     return null
//   }

//   const handleCheckboxChange = (event) => {
//     const { name, value } = event.target
//     const isChecked = event.target.checked

//     setBeerData((prevData) => {
//       if (isChecked) {
//         // Add the value to the array if it's checked
//         return {
//           ...prevData,
//           [name]: [...prevData[name], value],
//         }
//       } else {
//         // Remove the value from the array if it's unchecked
//         return {
//           ...prevData,
//           [name]: prevData[name].filter((item) => item !== value),
//         }
//       }
//     })
//   }

//   const generateOptions = (property) => {
//     if (enumValues[property]) {
//       return enumValues[property].map((value) => (
//         <option key={value} value={value}>
//           {value}
//         </option>
//       ))
//     }
//     return null
//   }

//   return (
//     <div>
//       <h2>Add Beer</h2>
//       <select value={selectedBrand} onChange={handleBrandChange}>
//         <option value="">Select a brand</option>
//         {brands.map((brand) => (
//           <option key={brand._id} value={brand._id}>
//             {brand.brandName}
//           </option>
//         ))}
//       </select>
//       {selectedBrand && (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="beerName"
//             placeholder="Beer Name"
//             value={beerData.beerName}
//             onChange={handleInputChange}
//           />
//           <select
//             name="beerType"
//             value={beerData.beerType}
//             onChange={handleInputChange}
//           >
//             <option value="">Select beer type</option>
//             {generateOptions('beerType')}
//           </select>
//           <select
//             name="fermentedType"
//             value={beerData.fermentedType}
//             onChange={handleInputChange}
//           >
//             <option value="">Select fermented type</option>
//             {generateOptions('fermentedType')}
//           </select>
//           <textarea
//             name="beerDescription"
//             placeholder="Beer Description"
//             value={beerData.beerDescription}
//             onChange={handleInputChange}
//           ></textarea>
//           <input
//             type="number"
//             name="alcoholByVolume"
//             placeholder="Alcohol By Volume"
//             value={beerData.alcoholByVolume}
//             onChange={handleInputChange}
//           />
//           <label>
//             Color:
//             <div>{generateAromaColorMouthfeelOptions('color')}</div>
//           </label>
//           <label>
//             Mouthfeel:
//             <div>{generateAromaColorMouthfeelOptions('mouthfeel')}</div>
//           </label>
//           <label>
//             Aroma:
//             <div>{generateAromaColorMouthfeelOptions('aroma')}</div>
//           </label>

//           <button type="submit">Add Beer</button>
//         </form>
//       )}
//     </div>
//   )
// }

// export default AddBeerForm
