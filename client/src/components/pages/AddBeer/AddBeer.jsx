import styles from './addBeer.module.css'
import React, { useState, useEffect } from 'react'

const AddBeerForm = () => {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [enumValues, setEnumValues] = useState({})
  const [alcoholByVolumeInput, setAlcoholByVolumeInput] = useState('')

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

  //for handling input of AbV only for numbers and convert it from string to number in database
  const handleAbVInput = (event) => {
    const { name, value } = event.target

    // Remove non-numeric and non-decimal characters from the input
    const formattedValue = value.replace(/[^0-9.]/g, '')

    setBeerData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }))

    setAlcoholByVolumeInput(formattedValue) // Update the formatted input value
  }

  const handleInputBlur = (event) => {
    const { name, value } = event.target
    const convertedValue = parseFloat(value) // Convert the input value to a number

    setBeerData((prevData) => ({
      ...prevData,
      [name]: convertedValue,
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

      setAlcoholByVolumeInput('')
    } catch (error) {
      console.log('Error adding beer:', error)
    }
  }
  const generateAromaColorMouthfeelOptions = (property) => {
    if (enumValues[property]) {
      return enumValues[property].map((value) => (
        <div key={value}>
          <input
            className={styles.optionCheckbox}
            type="checkbox"
            id={value}
            name={property}
            value={value}
            checked={beerData[property].includes(value)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={value} className={styles.checkboxLabel}>
            {value}
          </label>
        </div>
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
    <>
      <div className={styles.container}>
        <h1 className={styles.addBeerHeader}>Add Beer</h1>
        <select
          value={selectedBrand}
          onChange={handleBrandChange}
          className={styles.selectField}
        >
          <option value="">Select a brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.brandName}
            </option>
          ))}
        </select>
        {selectedBrand && (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.brandBox}>
              <input
                className={styles.inputField}
                type="text"
                name="beerName"
                required
                value={beerData.beerName}
                onChange={handleInputChange}
              />
              <label className={styles.beerLabel}>Beer Name</label>
            </div>
            <select
              className={styles.selectBeerProp}
              name="beerType"
              value={beerData.beerType}
              onChange={handleInputChange}
            >
              <option value="">Select beer type</option>
              {generateOptions('beerType')}
            </select>
            <select
              className={styles.selectBeerProp}
              name="fermentedType"
              value={beerData.fermentedType}
              onChange={handleInputChange}
            >
              <option value="">Select fermented type</option>
              {generateOptions('fermentedType')}
            </select>
            <div className={styles.brandBox}>
              <textarea
                className={styles.inputField}
                name="beerDescription"
                required
                value={beerData.beerDescription}
                onChange={handleInputChange}
              ></textarea>
              <label className={styles.beerLabel}>Beer Description</label>
            </div>
            <div className={styles.brandBox}>
              <input
                className={styles.inputField}
                type="text"
                required
                name="alcoholByVolume"
                value={alcoholByVolumeInput}
                // value={beerData.alcoholByVolume}
                onChange={handleAbVInput}
                onBlur={handleInputBlur}
                pattern="[0-9]+(.[0-9])"
              />
              <label className={styles.beerLabel}>Alcohol by Volume</label>
            </div>
            <p>Color:</p>
            <div className={styles.checkboxContainer}>
              {generateAromaColorMouthfeelOptions('color')}
            </div>

            <p>Mouthfeel:</p>
            <div className={styles.checkboxContainer}>
              {generateAromaColorMouthfeelOptions('mouthfeel')}
            </div>

            <p>Aroma:</p>
            <div className={styles.checkboxContainer}>
              {generateAromaColorMouthfeelOptions('aroma')}
            </div>
            <div className={styles.buttonBox}>
              <button id={styles.addBeerButton} type="submit">
                Add Beer
              </button>
            </div>
          </form>
        )}
      </div>
      <div className={styles.empty}></div>
    </>
  )
}

export default AddBeerForm
