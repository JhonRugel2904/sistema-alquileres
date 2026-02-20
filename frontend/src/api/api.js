import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Asegúrate de que este puerto sea donde corre tu Node
});

export default api;