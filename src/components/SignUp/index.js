import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../../ui-library/Form';
import { TextInput } from '../../ui-library/TextInput';
import { Container } from '../../ui-library/Container';
import { Button } from '../../ui-library/Button';
import { createAccount, resetSignup } from '../../redux/actions/signup';
import { ErrorMessage } from '../../ui-library/ErrorMessage';
import { getSignupErrorMessage, getSignupSuccess } from '../../redux/selectors/signup';
import { withRouter } from 'react-router-dom';
import { IDEAS, LOGIN } from '../../app/constants/routes';
import { Title } from '../../ui-library/Title';
import { ActionsWrap, Instructions, Wrap } from '../Login';
import { TextLink } from '../../ui-library/TextLink';

export const SignUp = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const errorMessage = useSelector(getSignupErrorMessage);
  const signupSuccess = useSelector(getSignupSuccess);

  useEffect(() => {
    if (signupSuccess) {
      dispatch(resetSignup());
      history.replace(IDEAS);
    }
  }, [dispatch, history, signupSuccess]);

  const validatePassword = password => {
    // 8 characters including 1 lowercase, 1 uppcase and 1 number
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const isValid = regExp.test(password);
    setPasswordError(
      isValid
        ? ''
        : 'Password must be at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number'
    );
    return isValid;
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (validatePassword(password)) {
      dispatch(createAccount({ name, email, password }));
    }
  };

  return (
    <Container>
      <Wrap>
        <Title title="Sign Up" />
        <Form onSubmit={handleFormSubmit}>
          <TextInput id="signup-name" required value={name} onChange={setName} placeholder="Name" />
          <TextInput
            id="signup-email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="email"
            required
          />
          <TextInput
            id="signup-password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            type="password"
            message={passwordError}
            required
          />
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <ActionsWrap>
            <Button>Sign up</Button>
            <Instructions>
              <span>Already have an account? </span>
              <TextLink to={LOGIN}>Login</TextLink>
            </Instructions>
          </ActionsWrap>
        </Form>
      </Wrap>
    </Container>
  );
});
