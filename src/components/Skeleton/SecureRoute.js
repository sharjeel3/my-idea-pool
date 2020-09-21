import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJwt, getMyUserInfo, isFetchUserInProgress } from '../../redux/selectors/auth';
import { TextLink } from '../../ui-library/TextLink';
import { LOGIN } from '../../app/constants/routes';
import { Container } from '../../ui-library/Container';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Wrap = styled('div')`
  padding: 2em 0;
`;

export const SecureRoute = ({ children, ...props }) => {
  const myUserInfo = useSelector(getMyUserInfo);
  const jwt = useSelector(getJwt);
  const isFetchingUserInfo = useSelector(isFetchUserInProgress);

  if (!myUserInfo.email && isFetchingUserInfo) {
    return 'loading...';
  }

  const isUserValid = !!jwt && !!myUserInfo.email;

  return (
    <Route {...props}>
      {isUserValid ? (
        children
      ) : (
        <Container>
          <Wrap>
            You must log in to continue. <TextLink to={LOGIN}>Log In</TextLink>
          </Wrap>
        </Container>
      )}
    </Route>
  );
};

SecureRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
