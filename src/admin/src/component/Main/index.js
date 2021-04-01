import { AuthProvider } from '../../context/Auth';
import React from 'react';
import MainRoutes from '../MainRoutes';

const Component = (props) => {
    return (
        <AuthProvider>
            <MainRoutes />
        </AuthProvider >
    )
};

export default Component;