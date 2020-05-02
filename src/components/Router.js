import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import '../assets/css/Main.style.css';
import history from 'utils/history';

import TopHeader from  './topheader/topHeader.components'

import * as routes from 'constants/routes';


import PrivateRoute from './common/routes/PrivateRoute';

// Top level application router.
const Router = () => (
  <BrowserRouter history={history}>
    <TopHeader/>
    <Switch>
    </Switch>
  </BrowserRouter>
);

export default Router;
