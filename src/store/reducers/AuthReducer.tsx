import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null, // Store token
  email: null, // Store email
};

const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGOUT = 'auth/LOGOUT';

export const loginSuccess = createAction(LOGIN_SUCCESS, (userData, token) => ({
  payload: {userData, token}, // Include both user data and token
}));
export const logout = createAction(LOGOUT);

const authReducer = createReducer(initialState, builder => {
  builder
    .addCase(loginSuccess, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.userData?.token; // Store token
      state.email = action.payload.userData?.email; // Assuming userData contains an email
    })
    .addCase(logout, () => initialState);
});

export default authReducer;
