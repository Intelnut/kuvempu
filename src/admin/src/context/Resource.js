import React, {
    createContext,
    useContext,
    useState
} from 'react';

import http from '../services/http';
import { useRouteMatch } from 'react-router-dom';

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

    const [resourceType, setResourceType] = useState(null);
    const [resourceId, setResourceId] = useState(null);
    const [data, setData] = useState(null);
    const [schema, setSchema] = useState(null);

    // fetch schema when resource type changes
    useEffect(() => {
        const response = await http.get(`${resource}/schema`);
        const schema = response.data;
        setSchema(schema);
    }, [resourceType]);

    // fetch all resources or individual resource
    useEffect(() => {

        const requests = {
            async all() {
                return await http.get(`${resource}`);
            },

            async single() {
                return http.get(`${resource}/${resourceId}`);
            }
        }

        const request = requests[resourceId] || requests['single'];
        const response = await request();
        const data = response.data;

        setData(data);

    }, [resourceType, resourceId]);

    // listen to the changes in route
    let routeMatch = useRouteMatch("/:type/:name");
    useEffect(() => {
        console.log('RESOURCE CONTEXT routeMatch >>', routeMatch);
    }, [routeMatch]);

    return (
        <ResourceContext.Provider value={{
            data,
            resourceType,
            resourceId,
            schema,
            setResourceType,
            setResourceId
        }}>{children}</ ResourceContext.Provider>
    )
}

export default ResourceProvider;