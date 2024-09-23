import styled from 'styled-components';
import { Card as BootstrapCard, Container as BootstrapContainer } from 'react-bootstrap';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

export const ProfileCard = styled(BootstrapCard)`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
`;

export const ProfileTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

export const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;

  /* Personal Information'daki username'e özel stil */
  .username {
    color: red; /* Kırmızı renk */
    font-weight: bold; /* Kalın font */
    font-size: 1.2rem; /* Biraz daha büyük font */
    margin-left: 10px; /* Personal Information başlığından biraz boşluk */
  }
`;

export const InlineFormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1rem;
  font-weight: 500;

  label {
    margin-right: 10px;
    color: #555;
  }

  span {
    font-weight: 400;
    color: #333;
  }
`;
