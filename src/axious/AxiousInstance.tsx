import axios from 'axios';
import {useEffect} from 'react';
import {onlineManager} from 'react-query';
import configureStore from '../store/ configureStore';
import {useDispatch} from 'react-redux';
import {logout} from '../store/reducers/AuthReducer';

const {store  } = configureStore();

const AxiosInstance = axios.create({
  baseURL: 'https://api.dailyshepherd.host/api/',
  headers: {
    'Content-Type': 'application/json',
    'X-API-TOKEN': 'ZqzT7tg5TEyAFxGS288Ryhv',
  },
});



AxiosInstance.interceptors.request.use(
  request => {
    if (!onlineManager.isOnline()) {
      return Promise.reject(new Error('Internet connection is not available'));
    }

    const storeData = store.getState();
    // Log the entire store state (optional for debugging)
    console.log('Store Data:', storeData);

    const token = storeData.auth.token;

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
    console.log(error,"instance error")
    const errorObj = JSON.parse(JSON.stringify(error?.response ?? error));

    if (errorObj.status == 401) {
      store.dispatch(logout());
    } else {
      throw errorObj;
    }
  },
);

export default AxiosInstance;
