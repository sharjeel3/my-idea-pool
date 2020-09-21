import React from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';
import { media } from '../../ui-library/theme/media';
import { useSelector } from 'react-redux';
import { getMyUserInfo } from '../../redux/selectors/auth';

const Root = styled('div')`
  background-color: ${brandColors.green};
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.greaterThan('lg')`
    flex-basis: 15.6%;
    text-align: center;
    padding: 2em 1em;
    display: block;
  `}
`;

const MainLink = styled('a')`
  color: ${brandColors.white};
  text-align: center;
  display: block;
  ${media.greaterThan('lg')`
    padding-bottom: 3.5em;
    border-bottom: 1px solid ${brandColors.offwhite};
    margin-bottom: 2.3em;
  `}
`;

const Image = styled('img')`
  width: 3em;
  height: 3em;
  margin-bottom: 0.75em;
  border-radius: 50%;
  ${media.greaterThan('lg')`
    width: 4em;
    height: 4em;
    margin-bottom: 0.75em;
  `}
`;

const User = styled('div')`
  text-align: center;
`;

const Name = styled('p')`
  color: ${brandColors.white};
`;

export const WelcomeBar = () => {
  const { name, avatarUrl } = useSelector(getMyUserInfo);
  const isLoggedIn = name && avatarUrl;
  return (
    <Root>
      <MainLink href="/" title="The Idea Pool">
        <Image id="ideal-pool-logo" src="/favicon-64x64.png" alt="The Idea Pool" />
        <p>The Idea Pool</p>
      </MainLink>
      {isLoggedIn && (
        <User>
          <Image id="user-avatar" src={avatarUrl} alt={name} />
          <Name>{name}</Name>
        </User>
      )}
    </Root>
  );
};
