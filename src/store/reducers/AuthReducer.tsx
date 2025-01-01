import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null, // Store token
  email: null, // Store email
  name: '', // Store name
  profile: null, // Store profile
  oldUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const {token, email, name, profile} = action.payload;
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
      state.name = name;
      state.profile = profile;
    },
    updateIsOldUser: (state, action) => {
      state.oldUser = action.payload;
    },
  },
});

export const {loginSuccess, logout, updateProfile ,updateIsOldUser} = authSlice.actions;
export default authSlice.reducer;
