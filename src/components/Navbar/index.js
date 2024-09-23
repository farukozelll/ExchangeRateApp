import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice'; // Logout işlemi için Redux aksiyonu
import { FaUserCircle } from 'react-icons/fa'; // Kullanıcı simgesi
import { NavbarContainer, NavbarBrand, UserSection, UserName, LogoutButton } from './index.style'; // Stillerin import edilmesi

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Redux durumundan kullanıcı bilgilerini alma

  // Kullanıcı oturumunu kapatmak için fonksiyon
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavbarContainer>
      {/* Marka veya logo */}
      <NavbarBrand href="/">Sade Yazılım ve Danışmanlık</NavbarBrand> 

      {/* Kullanıcı bilgi ve oturum kapatma */}
      <UserSection>
        <FaUserCircle size={24} style={{ marginRight: '8px' }} />
        <UserName>{user?.username || 'Guest'}</UserName> {/* Kullanıcı adı veya misafir */}
        {user && <LogoutButton onClick={handleLogout}>Çıkış</LogoutButton>} {/* Kullanıcı giriş yaptıysa oturum kapatma düğmesi */}
      </UserSection>
    </NavbarContainer>
  );
};

export default Navbar;
