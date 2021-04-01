import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';

import Layout from '../Layout';

import Schema from '../Schema';
import Settings from '../Settings';
import Dashboard from '../Dashboard';

const Component = (props) => {

    return (
        <Layout>
            <BrowserRouter>
                <Switch>
                    <Route path="/:schema" component={Schema} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </Layout>
    )
};

export default Component;