import React from 'react'
import styles from './addBrand.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from '../../elements/ConfirmationDialog/ConfirmationDialog'
import ConfirmBackButton from '../../elements/ConfirmationDialog/ConfirmBackButton'

export const AddBrand = () => {
  const [latitudeInput, setLatitudeInput] = useState('')
  const [longitudeInput, setLongitudeInput] = useState('')

  // useEffect(() => {
  //   window.addEventListener('beforeunload', alertUser)
  //   return () => {
  //     window.removeEventListener('beforeunload', alertUser)
  //   }
  // }, [])

  // const alertUser = (e) => {
  //   e.preventDefault()
  //   console.log('leaving page')
  //   setShowConfirmation(true)
  //   e.returnValue = ''
  // }

  const handleLatitudeChange = (event) => {
    const inputValue = event.target.value
    // Replace any non-digit characters except the decimal point
    const formattedValue = inputValue.replace(/[^0-9.]/g, '')
    setLatitudeInput(formattedValue)
  }

  const handleLongitudeChange = (event) => {
    const inputValue = event.target.value
    // Replace any non-digit characters except the decimal point
    const formattedValue = inputValue.replace(/[^0-9.]/g, '')
    setLongitudeInput(formattedValue)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = {
      brandName: formData.get('brandName'),
      url: formData.get('url'),
      brandDescription: formData.get('brandDescription'),
      mainAddress: {
        street: formData.get('street'),
        number: formData.get('number'),
        plz: formData.get('plz'),
        city: formData.get('city'),
        land: formData.get('land'),
        country: formData.get('country'),
        latitude: parseFloat(latitudeInput),
        longitude: parseFloat(longitudeInput),
      },
    }

    e.target.reset() //this resets the formData form

    try {
      await axios.post('/api/add-brand', data)
      resetForm() //this resets longitude and latitude fields
    } catch (error) {
      console.log(error)
    }
    console.log(data) //to see what we added

    console.log('Brand added!!!')
  }
  const resetForm = () => {
    setLatitudeInput('')
    setLongitudeInput('')
  }

  // const navigate = useNavigate()
  // const handleGoBack = () => {
  //   const confirmed = window.confirm(
  //     'Are you sure you want to leave this page?'
  //   )
  //   if (confirmed) {
  //     navigate('/addBeerOrBrand')
  //   }
  // }

  const backLink = '/addBeerOrBrand'
  const nameBackLink = 'Go Back'

  //The confirmation window code! The Window and styles on it is on elements/ConfirmationDialog/ConfirmationDialog.jsx
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
    navigate('/addBeerOrBrand')
  }

  return (
    <>
      <div className={styles.brandContainer}>
        <h1>Add a new brand</h1>
        <form onSubmit={handleFormSubmit} className={styles.formContainer}>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="brandName"
              id="brandName"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>Brand Name</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="url"
              id="url"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>URL</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="brandDescription"
              id="brandDescription"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>Brand Description</label>
          </div>
          <h3 id={styles.mainAddressHeader}>Main Address:</h3>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="street"
              id="street"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>Street</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="number"
              id="number"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>Number</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="plz"
              id="plz"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>PLZ</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="city"
              id="city"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>City</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="land"
              id="land"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>Land</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="country"
              id="country"
              required
              className={styles.brandInput}
            />
            <label className={styles.brandLabel}>Country</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="latitude"
              id="latitude"
              required
              className={styles.brandInput}
              value={latitudeInput}
              onChange={handleLatitudeChange}
              pattern="[0-9]+(\.[0-9]+)?"
            />
            <label className={styles.brandLabel}>Latitude</label>
          </div>
          <div className={styles.brandBox}>
            <input
              type="text"
              name="longitude"
              id="longitude"
              required
              className={styles.brandInput}
              value={longitudeInput}
              onChange={handleLongitudeChange}
              pattern="[0-9]+(\.[0-9]+)?"
            />
            <label className={styles.brandLabel}>Longitude</label>
          </div>
          {showConfirmation && (
            <ConfirmationDialog
              message="Are you sure you want to leave this page?"
              onConfirm={handleConfirmationConfirm}
              onCancel={handleConfirmationCancel}
            />
          )}
          <div className={styles.buttonBox}>
            <button type="submit" className={styles.formButton}>
              Add Brand
            </button>
          </div>
        </form>
        <ConfirmBackButton
          backLink={backLink}
          nameBackLink={nameBackLink}
          onButtonClicked={handleGoBack}
        />
      </div>
      <div className={styles.empty}></div>
    </>
  )
}

export default AddBrand
