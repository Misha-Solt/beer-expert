import axios from 'axios'

export const addBrand = () => {
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
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
      },
    }
    try {
      await axios.post('http://localhost:3001/api/add-brand', data)
    } catch (error) {
      console.log(error)
    }
    console.log(data) //to see what we added
    console.log('Brand added!!!')
  }

  return (
    <>
      <h1>Add a new brand</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="brandName">Brand Name</label>
        <input type="text" name="brandName" id="brandName" />
        <label htmlFor="url">URL</label>
        <input type="text" name="url" id="url" />
        <label htmlFor="brandDescription">Brand Description</label>
        <input type="text" name="brandDescription" id="brandDescription" />
        <h3>Main Address:</h3>
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" />
        <label htmlFor="number">Number</label>
        <input type="text" name="number" id="number" />
        <label htmlFor="plz">PLZ</label>
        <input type="text" name="plz" id="plz" />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" />
        <label htmlFor="land">Land</label>
        <input type="text" name="land" id="land" />
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" />
        <label htmlFor="latitude">Latitude</label>
        <input type="text" name="latitude" id="latitude" />
        <label htmlFor="longitude">Longitude</label>
        <input type="text" name="longitude" id="longitude" />
        <button type="submit">Add Brand</button>
      </form>
    </>
  )
}

export default addBrand
