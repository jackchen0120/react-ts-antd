import React from 'react';
import { Switch } from 'react-router-dom';

import { routerConfig } from './config';
import { PermissionAuth } from './permissionAuth';

 class Routes extends React.Component {
    render () {
        return (
            <Switch>
                <PermissionAuth config={ routerConfig } />
            </Switch>
        )
    }
}

export default Routes