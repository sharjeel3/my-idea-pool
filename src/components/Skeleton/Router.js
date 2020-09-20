import React from 'react';
import { BrowserRouter as ReactRouter, Route, Switch } from 'react-router-dom';
import { SignUp } from '../SignUp';
import { LOGIN, SIGN_UP } from '../../app/constants/routes';
import { NotFound } from '../NotFound';
import { Login } from '../Login';

export const Router = () => {
  return (
    <ReactRouter>
      <Switch>
        <Route path={SIGN_UP}>
          <SignUp />
        </Route>
        <Route path={LOGIN}>
          <Login />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </ReactRouter>
  );
};
