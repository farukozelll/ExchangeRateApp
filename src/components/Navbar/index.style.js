import styled from 'styled-components';

// Navbar Konteyneri
export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Gölge ekleyerek daha profesyonel görünüm
`;

// Navbar Marka ya da Logo
export const NavbarBrand = styled.a`
  font-size: 1.8rem; // Daha büyük font
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  &:hover {
    color: #0056b3; // Hover rengi
  }
`;

// Kullanıcı Bilgileri Bölümü
export const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

// Kullanıcı Adı
export const UserName = styled.span`
  font-size: 1rem;
  margin-right: 16px;
  font-weight: 600;
  color: #343a40;
`;

// Çıkış Butonu
export const LogoutButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
  }
`;
