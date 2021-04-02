import { RestrictedAccess } from '../../context/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';

import Login from '../Login';
import Resource from '../Resource';

const Component = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/' component={RestrictedAccess(Resource)} />
            </Switch>
        </BrowserRouter >
    )
};

export default Component;