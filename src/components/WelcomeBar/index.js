import React from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';
import { media } from '../../ui-library/theme/media';

const Root = styled('div')`
  background-color: ${brandColors.green};
  padding: 1em;
  ${media.greaterThan('lg')`
    flex-basis: 15.6%;
    display: flex;
    justify-content: center;
  `}
`;

const Logo = styled('img')`
  width: 3em;
  height: 3em;
  ${media.greaterThan('lg')`
    width: 4em;
    height: 4em;
  `}
`;

export const WelcomeBar = () => {
  return (
    <Root>
      <a href="/" title="The Idea Pool">
        <Logo src="/favicon-64x64.png" alt="The Idea Pool" />
      </a>
    </Root>
  );
};
