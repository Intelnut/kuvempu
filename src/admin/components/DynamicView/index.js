import React from 'react';
import { ProtectedRoute } from '../../context/Auth';

const Block = (props) => {
    return (
        <div>DynamicView</div>
    )
};

export default ProtectedRoute(Block);