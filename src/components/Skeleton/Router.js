import React from 'react';
import { BrowserRouter as ReactRouter, Route, Switch } from 'react-router-dom';
import { SignUp } from '../SignUp';
import { IDEAS, LOGIN, SIGN_UP } from '../../app/constants/routes';
import { NotFound } from '../NotFound';
import { Login } from '../Login';
import { MyIdeas } from '../MyIdeas';
import { Home } from '../Home';

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
        <Route path={IDEAS}>
          <MyIdeas />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </ReactRouter>
  );
};
