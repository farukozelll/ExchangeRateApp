import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Kullanıcı profilini çekmek için async thunk
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/user/profile');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    successMessage: '',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearMessages: (state) => {
      state.successMessage = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearMessages } = authSlice.actions;

export default authSlice.reducer;
