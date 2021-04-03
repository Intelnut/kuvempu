import { Switch, Route, useRouteMatch } from 'react-router-dom';

import React from 'react';

import DynaForm from '../DynaForm'

const Component = (props) => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/update`} component={DynaForm} />
        </Switch>
    )
};

export default Component;