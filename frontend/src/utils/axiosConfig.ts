import axios from 'axios';

const axiosConfig = (): void => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export default axiosConfig;