import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userData: null,
};

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGOUT = 'auth/LOGOUT';

export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS, (userData) => ({
  payload: userData,
}));
export const logout = createAction(LOGOUT);

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.isAuthenticated = false;
    })
    .addCase(loginSuccess, (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    })
    .addCase(logout, () => initialState);
});

export default authReducer;
