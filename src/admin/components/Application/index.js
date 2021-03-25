import React from 'react';
import { AuthProvider } from '../../context/Auth';

const Block = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
};

export default Block;