import { CheckAccess } from '../../context/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';

import Dashboard from '../Dashboard';
import Login from '../Login';
import Manage from '../Manage';

const Component = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/manage" component={CheckAccess(Manage)} />
                <Route path="/" component={CheckAccess(Dashboard)} />
            </Switch>
        </BrowserRouter >
    )
};

export default Component;