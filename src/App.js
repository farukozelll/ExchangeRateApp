import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from './store/authSlice'; // Kullanıcı profilini almak için Redux action
import LoginPage from './pages/LoginPage/index';
import Dashboard from './pages/Dashboard/index';
import './App.css';
import NotFoundPage from './pages/NotFoundPage/index'; // 404 sayfası ekleyin
import { ToastContainer } from 'react-toastify'; // ToastContainer bileşenini ekleyin
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS stilini ekleyin
import RegisterPage from './pages/RegisterPage/index'; // RegisterPage bileşenini ekleyin

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Giriş yapılmamışsa login sayfasına yönlendir */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />

        {/* Register sayfasını ekleyin */}
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />

        {/* Giriş yapılmışsa dashboarda yönlendir ve alt rotaları eşleştir */}
        <Route path="/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

        {/* Yanlış rota durumunda 404 sayfası */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;