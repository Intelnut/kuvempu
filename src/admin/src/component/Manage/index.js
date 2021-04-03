import { Switch, Route, useRouteMatch } from 'react-router-dom';

import React from 'react';

import DynaForm from '../DynaForm';
import DynaTable from '../DynaTable';

//import { useResource } from '../../context/Resource';

const Component = (props) => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/`} component={DynaTable} />
            <Route path={`${path}/:id`} component={DynaForm} />
        </Switch>
    )
};

export default Component;