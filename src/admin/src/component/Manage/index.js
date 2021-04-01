import { Switch, Route } from 'react-router-dom';

import React from 'react';

const Component = (props) => {
    return (
        <Switch>
            <Route path="/:schema" component={Schema} />
            <Route path="/settings" component={Settings} />
        </Switch>
    )
};

export default Component;