import { Switch, Route } from 'react-router-dom';

import React from 'react';

import ResourceProvider from '../../context/Resource';

import Layout from '../Layout';
import Manage from '../Manage';
import Settings from '../Settings';
import Dashboard from '../Dashboard';

const Component = (props) => {
    return (
        <ResourceProvider>
            <Layout>
                <Switch>
                    <Route path={`/settings`} component={Settings} />
                    <Route path={`/manage/:schema`} component={Manage} />
                    <Route path={`/`} component={Dashboard} />
                </Switch>
            </Layout>
        </ResourceProvider>
    )
};

export default Component;