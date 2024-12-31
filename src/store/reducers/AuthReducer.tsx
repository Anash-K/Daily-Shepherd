import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null, // Store token
  email: null, // Store email
  name: '', // Store name
  profile: null, // Store profile
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const {token, email, name, profile} = action.payload;
      console.log(action.payload, 'payload');
      state.token = token;
      state.email = email;
      state.name = name;
      state.profile = profile;
    },
    logout: state => {
      state.token = null;
      state.email = null;
      state.name = '';
      state.profile = null;
    },
    updateProfile: (state, action) => {
      const {name, profile} = action.payload;
      console.log(action.payload);
      state.name = name;
      state.profile = profile;
    },
  },
});

export const {loginSuccess, logout, updateProfile} = authSlice.actions;
export default authSlice.reducer;
