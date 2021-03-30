/** @format */

import Axios from 'axios';

import commonProps from '../properties/common.properties.json';

const createAxios = () => {

    return Axios.create({
        baseURL: commonProps.REST_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

const http = createAxios();

export default http;
