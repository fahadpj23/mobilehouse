import axios from 'axios';

const mobilehouseApi = axios.create({
  baseURL: 'http://localhost:9000',

})

export {mobilehouseApi}