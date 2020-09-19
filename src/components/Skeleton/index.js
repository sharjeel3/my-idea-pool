import React from 'react';
import { globalStyles } from '../../app/styles/global';
import { WelcomeBar } from '../WelcomeBar';
import { createGlobalStyle } from 'styled-components';
import { Router } from './Router';

const GlobalStyles = createGlobalStyle`
  ${globalStyles}
`;

GlobalStyles.displayName = 'GlobalStyles';

export const Skeleton = () => {
  return (
    <>
      <GlobalStyles />
      <WelcomeBar />
      <Router />
    </>
  );
};
