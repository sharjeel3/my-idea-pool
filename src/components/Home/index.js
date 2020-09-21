import React from 'react';
import { TextLink } from '../../ui-library/TextLink';
import { LOGIN, SIGN_UP } from '../../app/constants/routes';
import { Container } from '../../ui-library/Container';
import { Title } from '../../ui-library/Title';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';

const Content = styled('div')`
  font-size: 1.2em;
  line-height: 1.5;
  text-align: center;
`;

const Link = styled(TextLink)`
  padding: 0.3em 0.5em;
  display: inline-block;
  margin: 1em 1em;
  border: 1px solid ${brandColors.green};
  transition: all 0.1s;
  &:hover {
    background-color: ${brandColors.green};
    color: ${brandColors.white};
  }
`;

export const Home = () => {
  return (
    <Container>
      <Title title="Welcome back" />
      <Content>
        <p>
          The Idea Pool is a service that records your ideas! After signing up for an account.
          Follow the links below to get started.
        </p>
        <Link to={SIGN_UP}>Sign Up</Link>
        <Link to={LOGIN}>Login</Link>
      </Content>
    </Container>
  );
};
