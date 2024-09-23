import styled from 'styled-components';
import { Card as BootstrapCard, Container as BootstrapContainer, Button as BootstrapButton } from 'react-bootstrap';

export const CustomContainer = styled(BootstrapContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

export const CustomCard = styled(BootstrapCard)`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

export const CustomButton = styled(BootstrapButton)`
  width: 100%;
  background-color: #007bff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;
