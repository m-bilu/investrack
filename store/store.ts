import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import mobileMenuReducer from './slices/mobileMenuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileMenu: mobileMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
