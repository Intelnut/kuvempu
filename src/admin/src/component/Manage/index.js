import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';

import Schema from '../Schema';
import Settings from '../Settings';
import Dashboard from '../Dashboard';

const Component = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:schema" component={Schema} />
                <Route path="/settings" component={Settings} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
};

export default Component;