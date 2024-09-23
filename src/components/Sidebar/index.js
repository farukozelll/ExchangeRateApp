import React, { useState } from 'react';
import {
  FaHome,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaMoneyBill,
  FaExchangeAlt,
  FaBitcoin,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import {
  SidebarContainer,
  SidebarNavLink,
  ToggleButton,
  IconWrapper,
  TopSection,
  NavSection,
  Accordion,
  AccordionHeader,
  AccordionContent,
  FooterSection,
} from './index.style';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMoneyOpen, setIsMoneyOpen] = useState(false); // Money grubu için açılma/kapanma durumu

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMoneyAccordion = () => {
    setIsMoneyOpen(!isMoneyOpen);
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      {/* Üstte Ok Butonu */}
      <TopSection>
        <ToggleButton onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </ToggleButton>
      </TopSection>

      {/* Navigasyon Linkleri */}
      <NavSection>
        {/* Ana Sayfa */}
        <SidebarNavLink to="/home">
          <IconWrapper $isOpen={isOpen}>
            <FaHome />
          </IconWrapper>
          {isOpen && 'Ana Sayfa'}
        </SidebarNavLink>

        {/* Money Menü Grubu */}
        <Accordion>
          <AccordionHeader onClick={toggleMoneyAccordion}>
            <IconWrapper $isOpen={isOpen}>
              <FaMoneyBill />
            </IconWrapper>
            {isOpen && 'Para Türü'}
            {isOpen && (isMoneyOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </AccordionHeader>
          {isMoneyOpen && (
            <AccordionContent $isOpen={isOpen}>
              <SidebarNavLink to="/crypto">
                <IconWrapper $isOpen={isOpen}>
                  <FaBitcoin />
                </IconWrapper>
                {isOpen && 'Kripto Para'}
              </SidebarNavLink>
              <SidebarNavLink to="/exchangeRate">
                <IconWrapper $isOpen={isOpen}>
                  <FaExchangeAlt />
                </IconWrapper>
                {isOpen && 'Döviz Kuru'}
              </SidebarNavLink>
            </AccordionContent>
          )}
        </Accordion>

        {/* Profil Ayarları */}
        <SidebarNavLink to="/profile">
          <IconWrapper $isOpen={isOpen}>
            <FaUser />
          </IconWrapper>
          {isOpen && 'Profil'}
        </SidebarNavLink>
      </NavSection>

    </SidebarContainer>
  );
};

export default Sidebar;
