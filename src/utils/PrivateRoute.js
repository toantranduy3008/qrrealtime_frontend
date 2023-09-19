import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from "../services/Auth.service";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/merchantweb/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} {...rest} />
    }} />
)

export default PrivateRoute;