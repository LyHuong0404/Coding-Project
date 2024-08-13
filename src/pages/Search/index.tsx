import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Searchbar from '../../components/Searchbar';
import ProductItem from '../../components/ProductItem';
import { getProductList, searchProducts } from '../../actions/productActions';

interface SearchProps {
    children: React.ReactNode;
}

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const Search: React.FC<SearchProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(20);

    const getDataInit = () => {
        try {
            const fetchData = async () => {
                const response = await getProductList(0);
                setProducts(response);
                setSkip(20);
            };
            fetchData();
        } catch (err) {}
    }
    
    useEffect(() => {
        getDataInit();
    }, []);

    useEffect(() => {
        try {
            if (searchValue !== '') {
                const fetchData = async () => {
                    const response = await searchProducts(searchValue);
                    setProducts(response);
                };
                fetchData();
            }
        } catch (err) {}
    }, [searchValue])

    const loadMoreData = async () => {
        try {
            if (searchValue === '') {
                const response = await getProductList(skip);
                if (response.length === 0) {
                    setHasMore(false);
                } else {
                    setProducts((prev) => [...prev, ...response]);
                    setSkip(skip + 20);
                }
            } 
        } catch (err) {}
    };


    const getSearchValue = (value: string): void => {
        if (value === '') {
            setSkip(0);
            getDataInit();
        }
        setSearchValue(value);
    };

    return (
        <InfiniteScroll
            dataLength={products?.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader
        >
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="relative rounded-md shadow-sm">
                        <Searchbar onChangeValue={getSearchValue} />
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products?.map((item) => (
                            <ProductItem key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </InfiniteScroll>
    );
};

export default Search;
