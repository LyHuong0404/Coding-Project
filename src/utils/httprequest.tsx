import axios from 'axios';

const httprequest = axios.create({
    baseURL: 'https://dummyjson.com/',
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
