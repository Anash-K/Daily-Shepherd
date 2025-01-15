import {createSlice} from '@reduxjs/toolkit';
import {timerFormatter} from '../../utils/currentDateIntlFormat';

interface AuthState {
  token: string | null;
  email: string | null;
  name: string;
  profile: any; // You can replace `any` with a more specific type if needed
  oldUser: boolean;
  notification_time: string | null;
}

const initialState: AuthState = {
  token: null, // Store token
  email: null, // Store email
  name: '', // Store name
  profile: null, // Store profile
  oldUser: false,
  notification_time: '10:30:00',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const {token, email, name, profile, notification_time} = action.payload;
      let notifyTime;
      if (notification_time) {
        notifyTime = timerFormatter(notification_time);
      } else {
        notifyTime = null;
      }

      state.token = token;
      state.email = email;
      state.name = name;
      state.profile = profile;
      state.notification_time = notifyTime;
    },
    logout: state => {
      state.token = null;
      state.email = null;
      state.name = '';
      state.profile = null;
    },
    updateProfile: (state, action) => {
      const {name, profile, notification_time} = action.payload;
      console.log(notification_time, 'updateProfile');

      if (name) {
        state.name = name;
      }
      if (profile) {
        state.profile = profile;
      }
      state.notification_time = notification_time;
    },
    updateIsOldUser: (state, action) => {
      state.oldUser = action.payload;
    },
    updateNotificationTime: (state, action) => {
      state.notification_time = action.payload.notification_time;
    },
  },
});

export const {
  loginSuccess,
  logout,
  updateProfile,
  updateIsOldUser,
  updateNotificationTime,
} = authSlice.actions;
export default authSlice.reducer;
