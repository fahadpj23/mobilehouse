import axios from 'axios';
axios.defaults.withCredentials = true
const MobileHouseApi = axios.create({
  baseURL: process.env.REACT_APP_MOBILE_HOUSE,
})

export  {MobileHouseApi}

const MobileHouseApiImage = axios.create({
  baseURL: process.env.REACT_APP_MOBILE_HOUSEIMAGE,

})

export {MobileHouseApiImage}



