import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for React Native
import rootReducer from './rootReducer'; // Ensure this points to your combined reducer

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for React Native
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for AsyncStorage
    }),
});

export const persistor = persistStore(store);
export default store; // Export the store
