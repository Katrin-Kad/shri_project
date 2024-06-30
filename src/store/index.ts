import { configureStore } from '@reduxjs/toolkit';
import api from '../shared/api'; 
import authReducer from './slice/auth'; 

const store = configureStore({
  reducer: {
    api: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
