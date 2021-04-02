import { Switch, Route } from 'react-router-dom';

import React from 'react';

import DynaForm from '../DynaForm';
import DynaView from '../DynaView';
import DynaTable from '../DynaTable';

const Component = (props) => {
    return (
        <Switch>
            <Route path="/new" component={DynaForm} />
            <Route path="/edit/:id" component={DynaForm} />
            <Route path="/view/:id" component={DynaView} />
            <Route path="/" component={DynaTable} />
        </Switch>
    )
};

export default Component;