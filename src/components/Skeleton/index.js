import React from 'react';
import { globalStyles } from '../../app/styles/global';
import { WelcomeBar } from '../WelcomeBar';
import { createGlobalStyle } from 'styled-components';
import { Router } from './Router';
import styled from 'styled-components/macro';
import { media } from '../../ui-library/theme/media';

const GlobalStyles = createGlobalStyle`
  ${globalStyles}
`;

GlobalStyles.displayName = 'GlobalStyles';

const Root = styled('div')`
  margin: 0 auto;
  padding-bottom: 4em;
  ${media.greaterThan('lg')`
    padding-bottom: 0;
    max-width: 960px;
    display: flex;
    min-height: 100vh;
  `}
  ${media.greaterThan('xlg')`
    max-width: 1140px;
  `}
`;

export const Skeleton = () => {
  return (
    <>
      <GlobalStyles />
      <Root>
        <WelcomeBar />
        <Router />
      </Root>
    </>
  );
};
