import * as httprequest from '../utils/httprequest';

export const getProductList = async (skip: number ) => {
    try {
        const response = await httprequest.get('products', { params: { limit: 20, skip } });
        return response?.products;
    } catch (err) {
        console.log('Error when getting product list: ', err);
    }
};


export const searchProducts = async (value: string ) => {
    try {
        const response = await httprequest.get('products/search', { params: { q: value } });
        return response?.products;
    } catch (err) {
        console.log('Error when searching product list: ', err);
    }
};

