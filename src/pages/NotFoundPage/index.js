import React from 'react';
import { NotFoundContainer, Title, Message, HomeLink } from './index.style';

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <Title>404 - Page Not Found</Title>
      <Message>Sorry, the page you are looking for does not exist.</Message>
      <HomeLink to="/">Go to Home</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
