import React from 'react';
import { globalStyles } from '../../app/styles/global';
import { WelcomeBar } from '../WelcomeBar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${globalStyles}
`;

GlobalStyles.displayName = 'GlobalStyles';

export const Skeleton = () => {
  return (
    <>
      <GlobalStyles />
      <WelcomeBar />
    </>
  );
};
