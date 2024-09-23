import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 56px); /* Navbar'ın yüksekliği kadar alttan daralt */
  margin-top: 56px; /* Navbar yüksekliği */
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  transition: margin-left 0.3s ease, width 0.3s ease;
  width: ${({ isOpen }) => (isOpen ? 'calc(100% - 200px)' : 'calc(100% - 60px)')}; // Sidebar'a göre genişlik ayarı
  margin-left: ${({ isOpen }) => (isOpen ? '170px' : '50px')}; // Sidebar genişliğine göre margin ayarı

  @media (max-width: 768px) {
    width: 100%; // Mobilde tam genişlik
    margin-left: 0; // Sidebar kapanınca sıfırlanır
  }
`;
