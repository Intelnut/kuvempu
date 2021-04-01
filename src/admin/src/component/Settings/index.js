import { Switch, Route } from 'react-router-dom';

import React from 'react';

const Component = (props) => {
    return (
        <Switch>
            <Route path="/:schema" component={DynaForm} />
        </Switch>
    )
};

export default Component;