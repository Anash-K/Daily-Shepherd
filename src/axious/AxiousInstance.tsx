import axios from 'axios';
import {useEffect} from 'react';
import {onlineManager} from 'react-query';
import configureStore from '../store/configureStore';
import {useDispatch} from 'react-redux';
import {logout} from '../store/reducers/AuthReducer';
import store from '../store/configureStore';

const AxiosInstance = axios.create({
  baseURL: 'https://api.dailyshepherd.host/api/',
  headers: {
    'Content-Type': 'application/json',
    'X-API-TOKEN': 'ZqzT7tg5TEyAFxGS288Ryhv',
  },
});

AxiosInstance.interceptors.request.use(
  request => {
    // Check for online status before proceeding with the request
    if (!onlineManager.isOnline()) {
      return Promise.reject(new Error('Internet connection is not available'));
    }

    const storeData = store.getState();
    const token = storeData.auth?.token; // Safely access token

    if (request.data instanceof FormData) {
      request.headers['Content-Type'] = 'multipart/form-data';
    } else {
      request.headers['Content-Type'] = 'application/json';
    }

    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    if (error?.response?.status === 401) {
      store.dispatch(logout()); // Logout the user if 401 status
    } else {
      // If the error is not 401, throw it so the calling function can handle it
      throw JSON.parse(JSON.stringify(error?.response ?? error))
    }
  },
);

export default AxiosInstance;
