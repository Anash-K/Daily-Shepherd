import {combineReducers} from 'redux';
// Adjust the import path
import authReducer from './reducers/AuthReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
