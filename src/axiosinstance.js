import axios from 'axios';

const MobileHouseApi = axios.create({
  baseURL: process.env.REACT_APP_MOBILE_HOUSE,

})

export {MobileHouseApi}



// const MOBILE_HOUSEIMAGE =  process.env.REACT_APP_MOBILE_HOUSEIMAGE
// export {MOBILE_HOUSEIMAGE}

