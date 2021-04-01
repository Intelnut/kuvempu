import AuthProvider from '../../context/Auth';
import React from 'react';
import Routes from '../Routes';

const Component = (props) => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider >
    )
};

export default Component;