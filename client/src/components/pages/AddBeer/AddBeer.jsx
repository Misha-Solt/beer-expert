import BackButton from '../../elements/BackButton/BackButton'
import ConfirmBackButton from '../../elements/ConfirmationDialog/ConfirmBackButton'
import ConfirmationDialog from '../../elements/ConfirmationDialog/ConfirmationDialog'
import ForwardButton from '../../elements/ForwardButton/ForwardButton'
import styles from './addBeer.module.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { UploadForm } from '../../elements/UploadForm/UploadForm'

const AddBeerForm = () => {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [enumValues, setEnumValues] = useState({})
  const [alcoholByVolumeInput, setAlcoholByVolumeInput] = useState('')

  const [selectedImageFile, setSelectedImageFile] = useState(null)

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
      const response = await fetch('/api/brands')
      const data = await response.json()
      setBrands(data)
    } catch (error) {
      console.log('Error fetching brands:', error)
    }
  }

  const fetchEnumValues = async () => {
    try {
      const response = await fetch('/api/enum-values')
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

  const handleImageChange = (event) => {
    setSelectedImageFile(event.target.files[0])
    console.log('Selected image file:', event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('image', selectedImageFile)
    console.log(selectedImageFile)
    // Append other form data fields to formData
    formData.append('beerData', JSON.stringify(beerData))

    //solution for mapping the object to the form data object
    for (const [key, val] of Object.entries(beerData)) {
      formData.append(key, val)
    }
    console.log('FormData:', Array.from(formData))

    try {
      const response = await fetch(`/api/add-beer/${selectedBrand}`, {
        method: 'PATCH',
        headers: {
          // 'Content-Type': 'application/json',
        },
        // body: JSON.stringify(beerData),
        body: formData,
        credentials: 'include',
      })

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
      setSelectedImageFile(null)

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
  const forwardLink = '/addBrand'
  const nameForwardLink = 'Add Brand'
  const backLink = '/'
  const nameBackLink = 'Home'

  const [showConfirmation, setShowConfirmation] = useState(false)
  const navigate = useNavigate()

  const handleGoBack = (e) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleConfirmationCancel = () => {
    setShowConfirmation(false)
  }

  const handleConfirmationConfirm = () => {
    navigate('/')
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
          <>
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

              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                />
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
            <div className={styles.noBrandQuestion}>
              <ConfirmBackButton
                backLink={backLink}
                nameBackLink={nameBackLink}
                onButtonClicked={handleGoBack}
              />
            </div>
          </>
        )}
        {showConfirmation && (
          <ConfirmationDialog
            message="Are you sure you want to leave this page?"
            onConfirm={handleConfirmationConfirm}
            onCancel={handleConfirmationCancel}
          />
        )}
        {!selectedBrand && (
          <div className={styles.brandQuestion}>
            <BackButton backLink={backLink} nameBackLink={nameBackLink} />
            <h2>Didn't find a Brand? Add new one!</h2>
            <ForwardButton
              forwardLink={forwardLink}
              nameForwardLink={nameForwardLink}
            />
          </div>
        )}
      </div>
      {/* <div>
        <UploadForm />
      </div> */}
      <div className={styles.empty}></div>
    </>
  )
}

export default AddBeerForm
