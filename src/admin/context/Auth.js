import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import http from '../services/http';
import { useRouter } from 'next/router';

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

//TODO: remember user
//TODO: token expiry
/**
 * 
 * @param {*} Object 
 * Auth Context Provider
 */
export const AuthProvider = ({ children }) => {
    const loginRoute = '/login';
    const setupRoute = '/setup';
    const [claims, setClaims] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);

    const router = useRouter();

    const logout = () => {
        setClaims(null);
        setRedirectUrl(null);
        removeHTTPAuthHeader();
    }

    const removeHTTPAuthHeader = () => {
        delete http.defaults.headers.Authorization;
    }

    const setHTTPAuthHeader = (token) => {
        http.defaults.headers.Authorization = `Bearer ${token}`;
    }

    const hasPermission = (claims) => {
        return claims && !!claims.super_admin;
    }

    const login = async (credentials) => {
        let response = http.post(loginRoute, credentials);
        let data = await response.data;

        // terminate if invalid
        // let login component handle the error

        if (data.status === 'error') return data;
        if (!hasPermission(data.claims)) return {
            status: 'error',
            message: 'Access denied'
        };

        // all is well to proceed
        setClaims(data.claims); // set claims
        setHTTPAuthHeader(data.token); // attach auth headers
        router.replace(redirectUrl || '/'); // redirect user
        setRedirectUrl(null); // reset redirect url

        return data;
    }

    const createSuperAdmin = async () => {
        await http.post('/users/setup_sa');
        router.replace(loginRoute);
    }

    useEffect(() => {
        const unProtectedRoutes = [loginRoute, setupRoute];
        if (!unProtectedRoutes.includes(router.pathname) && !hasPermission(claims)) {
            // all routes are protected except login
            // redirect user to login, if not authenticated
            setRedirectUrl(router.pathname); // redirect user to current route after login
            router.push('/login');
        }

    }, [router.pathname]);

    return (<AuthContext.Provider value={{ login, logout, hasPermission, createSuperAdmin }}>{children}</AuthContext.Provider>)
}