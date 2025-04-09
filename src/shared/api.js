import axios from 'axios';
import { resetUserData } from './UserDataSlice';
import {store} from './Store.jsx';
const api = axios.create({
  baseURL: '/server',
  withCredentials: true,
  timeout: 10000,
});

export const setupInterceptors = (dispatch) => {
  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized - Redirect to login');
          store.dispatch(resetUserData()); // Reset Redux state when unauthorized
          window.location.href = '/login'; // Redirect to login page
        } else if (error.response.status === 403) {
          console.log('Forbidden - No permission');
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;
