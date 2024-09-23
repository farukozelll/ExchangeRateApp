import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import exchangeRateReducer  from './exchangeRateSlice';
import dashboardReducer from './dashboardSlice';
import cryptoReducer from './cryptoSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    exchangeRate: exchangeRateReducer ,
    dashboard: dashboardReducer,    
    crypto: cryptoReducer,
  },
});

export default store;
