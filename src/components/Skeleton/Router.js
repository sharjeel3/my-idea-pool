import React from 'react';
import { BrowserRouter as ReactRouter, Route, Switch } from 'react-router-dom';
import { SignUp } from '../SignUp';
import { SIGN_UP } from '../../app/constants/routes';
import { NotFound } from '../NotFound';

export const Router = () => {
  return (
    <ReactRouter>
      <Switch>
        <Route path={SIGN_UP}>
          <SignUp />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </ReactRouter>
  );
};
