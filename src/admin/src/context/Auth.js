import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import http from '../services/http';

/**
 * Auth Context
 */

const AuthContext = createContext({});

/**
 * Auth Context Hook
 */
const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth;

/**
 * 
 * @param {*} Object 
 * Auth Context Provider
 */
export const AuthProvider = ({ children }) => {
    return (<AuthContext.Provider value={{}}> { children}</ AuthContext.Provider>)
}