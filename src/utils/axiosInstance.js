import axios from 'axios';
import { getToken} from './constants';




// Set up axios instance
const axiosInstance = axios.create({
  baseURL: 'http://51.20.69.97:8080/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // try {
      //   // const newAccessToken = await refreshToken();

      //   // Set the new token to the original request header
      //   // axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

      //   // Retry the original request with the new token
      //   return axiosInstance(originalRequest);
      // } catch (refreshError) {
      //   console.error('Token refresh failed:', refreshError);
      //   // Redirect to login page if refresh fails
      //   Navigate('/login');
      //   return Promise.reject(refreshError);
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
