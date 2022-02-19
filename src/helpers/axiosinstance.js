import axios from 'axios';

console.log(process.env.REACT_APP_MOBILE_HOUSE)
const MobileHouseApi = axios.create({
  baseURL: process.env.REACT_APP_MOBILE_HOUSE,

})

export default MobileHouseApi
