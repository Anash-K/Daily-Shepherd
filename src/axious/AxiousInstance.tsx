import axios from 'axios';
import {onlineManager} from 'react-query';

const AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    authKey: 'ZqzT7tg5TEyAFxGS288Ryhv',
  },
});

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorObj = JSON.parse(JSON.stringify(error?.response ?? error));

    //   if (errorObj.status == 401) {
    //     store.dispatch(stateLogout());
    //   } else {
    //     throw errorObj;
    //   }
  },
);

// AxiosInstance.interceptors.request.use((request) =>{
//     if(!onlineManager.isOnline()){
//         return Promise.reject(new Error('Internet connection is not available'));
//     }

//     const storeData = store
// })
export default AxiosInstance;
