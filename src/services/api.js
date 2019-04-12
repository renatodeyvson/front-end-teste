import axios from 'axios';

const api = axios.create({ baseURL: 'https://back-end-teste.herokuapp.com/api' });

export default api;