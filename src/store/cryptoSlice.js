import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCryptoData, fetchCryptoAverage } from '../services/api';
import { toast } from 'react-toastify';

// İlk state yapısı
const initialState = {
  data: {
    bnBPrices: [],
    ethPrices: [],
    xrpPrices: [],
    bchPrices: [],
    ltcPrices: [],
    timestamps: [],
  },
  average: {
    bnB: 0,
    eth: 0,
    xrp: 0,
    bch: 0,
    ltc: 0,
  },
  loading: false,
  apiResponse: {}, // API response'larını saklamak için eklenen state
  error: null,
};

// 15 dakikalık verileri çekmek için async thunk
export const getCryptoData = createAsyncThunk('crypto/getCryptoData', async (symbol) => {
  try {
    const data = await fetchCryptoData(symbol);
    return { symbol, data }; // Sembol ile birlikte döner
  } catch (error) {
    toast.error('Failed to fetch recent prices.');
    throw error;
  }
});

// Son 60 dakikalık ortalama fiyat verisini çekmek için async thunk
export const getCryptoAverage = createAsyncThunk('crypto/getCryptoAverage', async (symbol) => {
  try {
    const average = await fetchCryptoAverage(symbol);
    return { symbol, average }; // Sembol ile birlikte döner
  } catch (error) {
    toast.error('Failed to fetch average price.');
    throw error;
  }
});

// Slice oluşturma
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        const { symbol, data } = action.payload;
        state.data[`${symbol.toLowerCase()}Prices`] = data.prices;
        state.data.timestamps = data.timestamps;
        state.apiResponse[symbol] = data; // API response'u kaydediyoruz
      })
      .addCase(getCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCryptoAverage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCryptoAverage.fulfilled, (state, action) => {
        state.loading = false;
        const { symbol, average } = action.payload;
        state.average[symbol.toLowerCase()] = average;
      })
      .addCase(getCryptoAverage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
