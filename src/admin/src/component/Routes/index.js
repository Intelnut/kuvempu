import { RestrictedAccess } from '../../context/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';

import Login from '../Login';
import Manage from '../Manage';

const Component = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={RestrictedAccess(Manage)} />
            </Switch>
        </BrowserRouter >
    )
};

export default Component;