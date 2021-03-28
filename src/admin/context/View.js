import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import View from '../config/view.json';
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

    const [context, setContext] = useState(null);
    const [document, setDocument] = useState(null);
    const [schema, setSchema] = useState(null);

    const router = useRouter();



    // listen to changes in window.location
    useEffect(() => {

        const query = router.query;

        const view = query[0]; //users, site etc
        const action = query[1]; //create,update,read. null for setting views
        const id = query[2]; //id of the doc. null for setting views

        setContext({
            view,
            action,
            id
        });


    }, [router.pathname]);

    // listen to changes in view
    // listen to changes in window.location
    useEffect(() => {

        const fetchData = async () => {
            // make http request to fetch schema
            // memoize schema
            setSchema();

            if (context.id) {
                // fetch document
                // ex: /users/:id
                setDocument()
            } else if (isSetting(context.view)) {
                // fetch setting
                // ex: /settings/:id
                setDocument();
            } else {
                // fetch collection
                // ex: /users
                setDocument();
            }
        }

        fetchData();

    }, [context]);

    useEffect(() => {
        //
    }, [router.pathname]);

    return (<ViewContext.Provider value={{ context, document, schema }}>{children}</ViewContext.Provider>)
}

// Auth ensures you are redirected to /login page if the user is not authenticated
// This HOC ensures unauthenticated users do not see the actual layout before being redirected
// Also avoids SSR of the views
export function ProtectedView(Component) {
    // TODO: Component with meaningful info
    return () => {
        const { claims, hasPermission } = useAuth();
        return (hasPermission(claims)) ? <Component /> : <div>Protected route</div>;
    };
}