import { RestrictedAccess } from '../../context/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';

import Login from '../Login';
import Resource from '../Resource';

const Component = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={RestrictedAccess(Resource)} />
                <Route path='/login' component={Login} />
            </Switch>
        </BrowserRouter >
    )
};

export default Component;