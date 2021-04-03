import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import http from '../services/http';
import { useRouteMatch, useLocation } from 'react-router-dom';

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

    const [resource, setResource] = useState({});
    const [model, setModel] = useState(null);
    const [schema, setSchema] = useState(null);

    // fetch and update schema when resource type changes
    const updateSchema = async (resourceType) => {
        const response = await http.get(`${resourceType}/schema`);
        const schema = response.data;
        setSchema({ ...schema });
    }

    useEffect(() => {
        resource.type && updateSchema(resource.type);
        !resource.type && setSchema(null);
    }, [resource.type]);

    const save = async (model) => {
        let method = (resource.id) ? 'put' : 'post';
        let endpoint = {
            put: `${resource.type}/${resource.id}`,
            post: `${resource.type}`
        }
        try {
            let respone = await http[method](endpoint[method], model);
            return {
                data: respone.data,
                success: true
            }
        } catch (error) {
            const errMsg = `Error ${method}ing ${resource.type} data`
            console.error(error.response.data);
            console.error(errMsg);
            return {
                error: errMsg
            }
        }
    }

    // fetch all resources or individual resource
    const updateModel = async (resourceType, resourceId) => {
        resourceId = resourceId || 'none';

        const requests = {
            async none() {
                return await http.get(`${resourceType}`);
            },

            async specified() {
                return http.get(`${resourceType}/${resourceId}`);
            }
        }

        const request = requests[resourceId] || requests['specified'];
        const response = await request();
        const data = response.data;

        setModel(data);
    }

    useEffect(() => {
        resource.type && updateModel(resource.type, resource.id);
        !resource.type && setModel(null);
    }, [resource.type, resource.id]);

    // listen to the changes in route
    const paths = [
        '/:view/:type/:id',
        '/:view/:type',
    ];

    const defaultMatch = { params: {} };
    const matchCU = useRouteMatch(paths.shift());
    const matchAll = useRouteMatch(paths.shift());
    const finalMatch = matchCU || matchAll || defaultMatch;

    const location = useLocation();

    const onPathChange = () => {
        const params = finalMatch.params;
        const type = params.type;
        const id = !(['new', 'update'].includes(params.id)) && params.id;
        setResource({ type, id });
    }

    useEffect(onPathChange, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ResourceContext.Provider value={{
            model,
            schema,
            resource,
            save
        }}>{children}</ ResourceContext.Provider>
    )
}

export default ResourceProvider;