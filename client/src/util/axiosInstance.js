import axios from 'axios'

const axiosApiInstance = axios.create()

axiosApiInstance.defaults.baseURL = '/'

export default axiosApiInstance
