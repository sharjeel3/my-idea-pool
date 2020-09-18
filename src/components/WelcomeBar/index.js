import React from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';

const Root = styled('div')`
  background-color: ${brandColors.green};
  padding: 1em;
`;

const Logo = styled('img')`
  width: 3em;
  height: 3em;
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
