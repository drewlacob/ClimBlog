import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `http://localhost:3000`, //TODO: use .env here?
});

export { axiosClient };
