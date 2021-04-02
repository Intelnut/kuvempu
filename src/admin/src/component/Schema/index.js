import { Switch, Route } from 'react-router-dom';

import React from 'react';

import DynaForm from '../DynaForm';
import DynaView from '../DynaView';
import DynaTable from '../DynaTable';

const Component = (props) => {
    return (
        <Switch>
            <Route path="/create" component={DynaForm} />
            <Route path="/update/:id" component={DynaForm} />
            <Route path="/preview/:id" component={DynaView} />
            <Route path="/" component={DynaTable} />
        </Switch>
    )
};

export default Component;