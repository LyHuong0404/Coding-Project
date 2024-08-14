import * as httprequest from '../utils/httprequest';
import { handleError } from '../errorHandler';

export const getProductList = async (skip: number ) => {
    try {
        const response = await httprequest.get('products', { params: { limit: 20, skip } });
        return response?.products || [];
    } catch (err) {
        handleError(err);
        return null;
    }
};


export const searchProducts = async (value: string | null, skip: number) => {
    try {
        const response = await httprequest.get('products/search', { params: { q: value, limit: 20, skip } });
        return response?.products || [];
    } catch (err) {
        handleError(err);
        return null;
    }
};

