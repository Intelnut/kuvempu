import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import ViewConfig from '../config/view.json';
import useAuth from '../services/Auth';
import http from '../services/http';
import { useRouter } from 'next/router';

/**
 * View Context
 */

const ViewContext = createContext({});

/**
 * View Context Hook
 */

const useView = () => {
    return useContext(ViewContext);
}
export default useView;

/**
 * 
 * @param {*} Object 
 * View Context Provider
 */
export const ViewProvider = ({ children }) => {

    const [config, setConfig] = useState(ViewConfig);

    useEffect(() => {
        //
    }, [router.pathname]);

    return (<ViewContext.Provider value={{ config }}>{children}</ViewContext.Provider>)
}

// Auth ensures you are redirected to /login page if the user is not authenticated
// This HOC ensures unauthenticated users do not see the actual layout before being redirected
// Also avoids SSR of the views
export function ProtectedView(Component) {
    // TODO: Component with meaningful info
    return () => {
        const { claims, hasPermission } = useAuth();
        return (hasPermission(claims)) ? <Component /> : <div className='p-8 text-gray-700'>Protected route</div>;
    };
}