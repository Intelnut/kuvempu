import React, {
    createContext,
    useContext,
    useState
} from 'react';

import http from '../services/http';

/**
 * Resource Context
 */

const ResourceContext = createContext({});

/**
 * Resource Context Hook
 */
export const useResource = () => {
    return useContext(ResourceContext);
}

/**
 * 
 * @param {*} Object 
 * Resource Context Provider
 */
const ResourceProvider = ({ children }) => {

    return (<ResourceContext.Provider value={{}}>{children}</ ResourceContext.Provider>)
}

export default ResourceProvider;