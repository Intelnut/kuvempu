import { Switch, Route } from 'react-router-dom';

import React from 'react';

import DynaForm from '../DynaForm'

const Component = (props) => {
    return (
        <Switch>
            <Route path="/:schema" component={DynaForm} />
        </Switch>
    )
};

export default Component;