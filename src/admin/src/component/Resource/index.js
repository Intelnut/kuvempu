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
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/settings/:resourceType' component={Settings} />
                    <Route path='/manage/:resourceType' component={Manage} />
                </Switch>
            </Layout>
        </ResourceProvider>
    )
};

export default Component;