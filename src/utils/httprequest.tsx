import axios from 'axios';

const httprequest = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const get = async (apipath: string, params = {}) => {
    const response = await httprequest.get(apipath, params);
    return response.data;
};

export const post = async (apipath: string, data: any, params = {}) => {
    const response = await httprequest.post(apipath, data, params);
    return response.data;
};

export default httprequest;
