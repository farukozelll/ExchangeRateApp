import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, register as registerApi, getUserProfile, updateUserProfile } from '../services/api';

// Başlangıç durumu
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  successMessage: null,
};

// Giriş işlemi
// Login fonksiyonunda `authSlice.js` dosyasında, API yanıtındaki `response.data` yapısını kontrol edin.
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);
    // API yanıtının `token` içerdiğinden emin olun.
    if (!response.token) {
      throw new Error('Login failed: Invalid response.');
    }
    return response;
  } catch (err) {
    // API yanıtındaki hatayı düzgün bir şekilde ele alın.
    return rejectWithValue(err.response?.data || 'An error occurred during login.');
  }
});


// Kayıt işlemi
export const register = createAsyncThunk('auth/register', async (registerData, { rejectWithValue }) => {
  try {
    const response = await registerApi(registerData);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Kullanıcı profilini alma
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await getUserProfile(token);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Kullanıcı profilini güncelleme
export const updateUserProfileThunk = createAsyncThunk('auth/updateUserProfile', async (userData, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await updateUserProfile(userData, token);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      // authSlice.js
      .addCase(login.fulfilled, (state, action) => {
        // API yanıtından token'ı alın.
        state.token = action.payload.token; // `action.payload.token` olduğundan emin olun.
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.successMessage = 'Login successful!';
        localStorage.setItem('token', action.payload.token);
      })

      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
        state.successMessage = 'Registration successful!';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout, clearMessages } = authSlice.actions;

export default authSlice.reducer;
