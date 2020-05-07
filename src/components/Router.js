import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import '../assets/css/Main.style.css';
import history from 'utils/history';
import MainPage from './MainPage/MainPage.component'
import * as routes from 'constants/routes';
import Header from './headercomponent/header.component';
import EnterUserDetails from './EnterUserDetails/EnterUserDetails.components';

import PrivateRoute from './common/routes/PrivateRoute';

// Top level application router.
const Router = () => (
  <BrowserRouter history={history}>
    <Header/>
    <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path='/EnterUserDetails' component={EnterUserDetails}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
