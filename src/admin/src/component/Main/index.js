import { AuthProvider } from '../../context/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Manage from '../Manage';

const Component = (props) => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/manage" component={Manage} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </BrowserRouter >
        </AuthProvider >
    )
};

export default Component;