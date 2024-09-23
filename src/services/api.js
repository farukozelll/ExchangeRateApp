import axios from 'axios';

// API URL
const API_URL = 'http://localhost:8080/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS için credentials'ları 
});

// Token'ı Header'a ekleme fonksiyonu
export const setAuthToken = (token) => {
  if (token) {
    console.log("Token set in header:", token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log("Authorization header removed");
  }
};


// Login fonksiyonu
export const login = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    if (!response.data.token) {
      throw new Error('Login failed: Invalid response from server.');
    }
    setAuthToken(response.data.token); // Token
    return response.data;
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      response: error.response, // Sunucudan dönen yanıt (error.response)
      config: error.config, // Axios isteği konfigürasyonu
    });
    throw error; 
  }
};

// Register fonksiyonu
export const register = async (registerData) => {
  const response = await api.post('/auth/register', registerData);
  return response.data;
};

// Kullanıcı bilgilerini alma fonksiyonu
export const getUserProfile = async () => {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
    if (!token) {
      throw new Error("Token bulunamadı!");
    }
  
    try {
      const response = await api.get('/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("User profile response:", response.data); 
      return response.data;
    } catch (err) {
      console.error("Profil alma hatası:", err);
      throw err;
    }
  };
  
// Kullanıcı profilini güncelleme fonksiyonu
export const updateUserProfile = async (userData, token) => {
    const response = await api.put('/user/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };
  
// ETH/BTC 15 dakikalık verilerini çekme
export const fetchCryptoData = async (symbol = 'ETHBTC') => {
  try {
    const response = await api.get(`/crypto/recent-prices?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recent prices:', error);
    throw error;
  }
};

// Son 60 dakika içindeki ortalama fiyatı çekme
export const fetchCryptoAverage = async (symbol = 'ETHBTC') => {
  try {
    const response = await api.get(`/crypto/hourly-average?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch average price:', error);
    throw error;
  }
};

// Crypto fiyatlarını manuel çekme ve kaydetme
export const fetchAndSaveCryptoPrice = async (symbol) => {
  try {
    const response = await api.post(`/crypto/fetch-now?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch and save crypto price:', error);
    throw error;
  }
};



// USD/TRY 7 günlük verilerini çekme
export const fetchUsdTry7Days = async () => {
  try {
    const token = localStorage.getItem('token'); // Token'ı al
    if (!token) {
      throw new Error("Token bulunamadı!");
    }

    setAuthToken(token); // Token'ı ayarlayın

    const response = await api.get('/exchange-rates/all');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch USD/TRY data:', error);
    throw error;
  }
};

// Son 60 dakika içindeki USD/TRY ortalama fiyatı çekme
export const fetchUsdTryAverage = async () => {
  try {
    const token = localStorage.getItem('token'); // Token'ı al
    if (!token) {
      throw new Error("Token bulunamadı!");
    }

    setAuthToken(token); // Token'ı ayarlayın

    const response = await api.get('/exchange-rates/fetch-now');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch average price:', error);
    throw error;
  }
};
export default api;
