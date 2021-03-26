import React from 'react';
import { ProtectedView } from '../../context/View';

const Block = (props) => {
    return (
        <div>DynamicView</div>
    )
};

export default ProtectedView(Block);