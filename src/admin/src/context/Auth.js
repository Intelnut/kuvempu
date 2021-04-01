import React, {
    createContext,
    useContext,
    useState
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
export const useAuth = () => {
    return useContext(AuthContext);
}

/**
 * 
 * @param {*} Object 
 * Auth Context Provider
 */
const AuthProvider = ({ children }) => {

    const loginApiEndpoint = '/login';

    const [claims, setClaims] = useState(null);

    const isLoggedIn = () => {
        return !!claims;
    }

    const isSuperAdmin = () => {
        return claims && !!claims.super_admin;
    }

    const unsetHTTPAuthHeader = () => {
        delete http.defaults.headers.Authorization;
    }

    const setHTTPAuthHeader = (token) => {
        http.defaults.headers.Authorization = `Bearer ${token}`;
    }

    const handleLoginSuccess = (data) => {
        setClaims(data.claims);
        setHTTPAuthHeader(data.token);
    }

    const login = async (credentials) => {
        try {

            let response = await http.post(loginApiEndpoint, credentials);
            let data = response.data;
            handleLoginSuccess(data);
            return {
                success: true
            }

        } catch (error) {

            // TODO: Custom error info based on reason
            console.error(error.response.data);
            return {
                error: 'Error authenticating user'
            }

        }
    }

    const logout = () => {
        setClaims(null);
        unsetHTTPAuthHeader();
    }

    return (<AuthContext.Provider value={{ login, logout, isLoggedIn, isSuperAdmin }}> { children}</ AuthContext.Provider>)
}

export default AuthProvider;

/**
 * View access control
 * @param {*} Component 
 */

export function RestrictedAccess(Component) {

    const { isLoggedIn, isSuperAdmin } = useAuth();

    const TakeAction = (props) => {
        const location = props.location;
        return (isLoggedIn()) ? <Forbidden /> : <Redirect
            to={{
                pathname: "/login",
                state: {
                    referer: location.pathname
                }
            }}
        />;
    }

    return (props) => {
        return (isSuperAdmin()) ? <Component {...props} /> : <TakeAction {...props} />;
    };
}