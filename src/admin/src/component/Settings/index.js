import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';

import DynaForm from '../DynaForm'

const Component = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:schema" component={DynaForm} />
            </Switch>
        </BrowserRouter>
    )
};

export default Component;