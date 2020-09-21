import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../../ui-library/Form';
import { TextInput } from '../../ui-library/TextInput';
import { Container } from '../../ui-library/Container';
import { Button } from '../../ui-library/Button';
import { login } from '../../redux/actions/auth';
import { ErrorMessage } from '../../ui-library/ErrorMessage';
import { getLoginErrorMessage, getLoginSuccess } from '../../redux/selectors/auth';
import { withRouter } from 'react-router-dom';
import { IDEAS, SIGN_UP } from '../../app/constants/routes';
import { Title } from '../../ui-library/Title';
import styled from 'styled-components/macro';
import { media } from '../../ui-library/theme/media';
import { TextLink } from '../../ui-library/TextLink';

export const Wrap = styled('div')`
  ${media.greaterThan('lg')`
    max-width: 65%;
    margin: 10em auto 0;
  `}
  ${media.greaterThan('xlg')`
    max-width: 52%;
  `}
`;

export const Instructions = styled('div')`
  margin-top: 1em;
  ${media.greaterThan('md')`
    margin: 0 0 0 1.625em;
  `}
`;

export const ActionsWrap = styled('div')`
  ${media.greaterThan('md')`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const Login = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorMessage = useSelector(getLoginErrorMessage);
  const loginSuccess = useSelector(getLoginSuccess);

  useEffect(() => {
    if (loginSuccess) {
      history.replace(IDEAS);
    }
  }, [history, loginSuccess]);

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <Wrap>
        <Title title="Login" />
        <Form onSubmit={handleFormSubmit}>
          <TextInput
            id="login-email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="email"
            required
          />
          <TextInput
            id="login-password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            type="password"
            required
          />
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <ActionsWrap>
            <Button>log in</Button>
            <Instructions>
              <span>Don't have an account? </span>
              <TextLink to={SIGN_UP}>Create an account</TextLink>
            </Instructions>
          </ActionsWrap>
        </Form>
      </Wrap>
    </Container>
  );
});
