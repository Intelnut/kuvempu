import { Switch, Route } from 'react-router-dom';

import React from 'react';

import DynaForm from '../DynaForm';
import DynaTable from '../DynaTable';

//import { useResource } from '../../context/Resource';

const Component = (props) => {
    return (
        <Switch>
            <Route path="/new" component={DynaForm} />
            <Route path="/:id" component={DynaForm} />
            <Route path="/" component={DynaTable} />
        </Switch>
    )
};

export default Component;