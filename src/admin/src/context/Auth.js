import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import { Redirect } from 'react-router-dom';
import Forbidden from '../component/Forbidden';


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

    const [claims, setClaims] = useState(null);

    const isLoggedIn = () => {
        return !!claims;
    }

    const isSuperAdmin = () => {
        return claims && !!claims.super_admin;
    }

    return (<AuthContext.Provider value={{ isLoggedIn, isSuperAdmin }}> { children}</ AuthContext.Provider>)
}

/**
 * View access control
 * @param {*} Component 
 */
export function CheckAccess(Component) {

    const { isLoggedIn, isSuperAdmin } = useAuth();

    const TakeAction = () => {
        return (isLoggedIn()) ? <Forbidden /> : <Redirect
            to={{
                pathname: "/login",
                state: {}
            }}
        />;
    }

    return () => {
        return (isSuperAdmin()) ? <Component /> : <TakeAction />;
    };
}