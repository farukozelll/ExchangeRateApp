import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NotFoundContainer = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

export const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

export const Message = styled.p`
  font-size: 1.2em;
  margin-bottom: 30px;
`;

export const HomeLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
