import React from 'react';
import history from 'utils/history';
import * as routes from 'constants/routes';
import PrivateRoute from './common/routes/PrivateRoute';
import MainPage from './mainPage/mainPage.component';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './headerComponent/headerComponent.component';
import EnterUserDetails from './enterUserDetails/enterUserDetails.components';

import '../assets/css/Main.style.css';

// Top level application router.
const Router = () => (
  <BrowserRouter history={history}>
    <Header />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/enterUserDetails" component={EnterUserDetails} />
    </Switch>
  </BrowserRouter>
);

export default Router;
