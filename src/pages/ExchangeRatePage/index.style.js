import styled from 'styled-components';
import { Card as BootstrapCard, Container as BootstrapContainer } from 'react-bootstrap';

// Genel container
export const Container = styled(BootstrapContainer)`
  margin-top: 30px;
  max-width: 1200px;
  padding: 20px;
  background-color: #f9f9f9; // Arka plan rengi
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

// Kart bileşeni
export const Card = styled(BootstrapCard)`
  border: none;
  border-radius: 12px; // Köşeleri yuvarla
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // Kutu gölgesi
  transition: transform 0.3s ease-in-out; // Geçiş animasyonu

  &:hover {
    transform: translateY(-5px); // Hover sırasında kart hafifçe yukarı kalkar
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); // Gölge genişler
  }
`;

// Kart başlığı
export const CardTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem; // Font boyutunu artır
  color: #2c3e50; // Koyu gri ton
  font-weight: 600;
`;

// Kart içeriği
export const CardContent = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 1.1rem; // Biraz daha büyük font
  color: #34495e; // Koyu gri ton
`;

// Spinner konumu
export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Spinner bileşeni
export const Spinner = styled.div`
  width: 60px; // Boyutu artır
  height: 60px; // Boyutu artır
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
