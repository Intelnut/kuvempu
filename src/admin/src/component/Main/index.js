import { AuthProvider } from './context/Auth';
import { Switch, Route } from 'react-router-dom';

import React from 'react';
import Dashboard from '../../../../admin-/components/Dashboard';

const Component = (props) => {
    return (
        <AuthProvider>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/manage" component={Manage} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </AuthProvider>
    )
};

export default Component;