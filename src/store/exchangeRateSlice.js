import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchUsdTry7Days, fetchUsdTryAverage } from '../services/api';

// Asenkron thunk, API çağrılarını yapar
export const fetchLatestExchangeRate = createAsyncThunk(
  'exchangeRate/fetchLatest',
  async () => {
    const data = await fetchUsdTryAverage();
    return data;
  }
);

export const fetchAllExchangeRates = createAsyncThunk(
  'exchangeRate/fetchAll',
  async () => {
    const data = await fetchUsdTry7Days();
    return data;
  }
);

// Slice'ı oluştur
const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState: {
    data: { timestamps: [], prices: [] },
    average: null,
    allRates: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestExchangeRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestExchangeRate.fulfilled, (state, action) => {
        state.loading = false;
         // `rate` değerini `average`'a atıyoruz
         state.average = action.payload.rate;
        })
      .addCase(fetchLatestExchangeRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllExchangeRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllExchangeRates.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // 7 günlük veriyi state'e ekle
      })
      .addCase(fetchAllExchangeRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default exchangeRateSlice.reducer;
