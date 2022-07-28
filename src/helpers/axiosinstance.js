import axios from 'axios';


const MobileHouseApi = axios.create({
  baseURL: process.env.REACT_APP_MOBILE_HOUSE,

})

export default MobileHouseApi
