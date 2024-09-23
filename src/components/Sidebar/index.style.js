import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

// Sidebar Ana Container
export const SidebarContainer = styled.div`
  background-color: #343a40;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 5px;
  transition: width 0.3s ease, left 0.3s ease;
  width: ${({ $isOpen }) => ($isOpen ? '180px' : '50px')}; // Sidebar genişliğini daralttık
  overflow: hidden;
  white-space: nowrap;
  position: fixed;
  top: 56px; // Navbar'ın altında kalması için
  left: 0;
  bottom: 0;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: ${({ $isOpen }) => ($isOpen ? '200px' : '0px')}; // Küçük ekranlar için ayar
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')}; // Mobil görünümde gizleme
  }
`;

// Üst Bölüm (Toggle Button İçin)
export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-end' : 'center')};
  padding: 10px 0;
`;

// Navigasyon Linklerinin Konteyneri
export const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  overflow-y: auto;
  margin-top: 20px;
`;

// Sidebar Linkleri
export const SidebarNavLink = styled(RouterNavLink)`
  color: #ddd;
  padding: 10px 15px;
  margin-bottom: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  transition: background-color 0.2s, color 0.2s;
  width: 100%;

  &.active {
    font-weight: bold;
    color: #fff;
    background-color: #495057;
  }

  &:hover {
    color: #fff;
    background-color: #495057;
  }
`;

// Sidebar Toggle Butonu
export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #ddd;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #fff;
  }
`;

// İkonların Konteyneri
export const IconWrapper = styled.div`
  margin-right: ${({ $isOpen }) => ($isOpen ? '10px' : '0')};
  transition: margin 0.3s ease;
`;

// Accordion (Gruplar İçin)
export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// Accordion Başlığı (Tıklanabilir Kısım)
export const AccordionHeader = styled.div`
  color: #ddd;
  padding: 10px 15px;
  display: flex;
  align-items: left;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1.1rem;
  background-color: #3a3f44;
  border-radius: 5px;

  &:hover {
    color: #fff;
    background-color: #495057;
  }
`;

// Accordion İçeriği (Alt Linkler)
export const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ $isOpen }) => ($isOpen ? '10px' : '0')};
  margin-top: 5px;
`;

// Footer (En Alt Bölüm)
export const FooterSection = styled.div`
  text-align: center;
  padding: 10px;
  color: #ddd;
  font-size: 0.8rem;
  border-top: 1px solid #495057;
  background-color: #2c3036;
  width: 100%;
`;

