import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import HomePage from '../HomePage/index';
import CryptoPage from '../CryptoPage/index';
import ProfilePage from '../ProfilePage/index';
import { DashboardContainer, ContentWrapper, MainContent } from './index.style';
import ExchangeRatePage from '../ExchangeRatePage/index'; // ExchangeRatePage import ettik



const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar durumunu yönetmek için

  return (
    <DashboardContainer>
      <Navbar />
      <MainContent>y
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> 
        <ContentWrapper isOpen={isOpen}>
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="crypto" element={<CryptoPage />} />
            <Route path="exchangeRate" element={<ExchangeRatePage />} /> 

            <Route path="profile" element={<ProfilePage />} />
            <Route path="/" element={<HomePage />} /> 
          </Routes>
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;