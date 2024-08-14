import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

import Searchbar from '../../components/Searchbar';
import ProductItem from '../../components/ProductItem';
import { getProductList, searchProducts } from '../../actions/productActions';
import { Product } from '../../models/Product';

interface SearchProps {
    children: React.ReactNode;
}

const Search: React.FC<SearchProps> = () => {
    const [searchValue, setSearchValue] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);

    const getDataInit = () => {
        try {
            const fetchData = async () => {
                const response = await getProductList(0);
                setProducts(response);
                setSkip(20);
            };
            fetchData();
        } catch (err) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    useEffect(() => {
        getDataInit();
    }, []);

    useEffect(() => {
        try {
            !hasMore && setHasMore(true);
            if (searchValue !== '' && searchValue !== null) {
                const fetchData = async () => {
                    const response = await searchProducts(searchValue, 0);
                    setProducts(response);
                    setSkip(20);
                };
                fetchData();
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.');
        }
    }, [searchValue]);

    const loadMoreData = async () => {
        try {
            if (searchValue === '' || searchValue === null) {
                const response = await getProductList(skip);
                if (response) {
                    if (response.length === 0) {
                        setHasMore(false);
                    } else {
                        setProducts((prev) => [...prev, ...response]);
                        if (response.length < 20) {
                            setHasMore(false);
                            return;
                        }
                        setSkip(skip + 20);
                    }
                }
            } else {
                const response = await searchProducts(searchValue, skip);
                if (response) {
                    if (response.length === 0) {
                        setHasMore(false);
                    } else {
                        setProducts((prev) => [...prev, ...response]);
                        if (response.length < 20) {
                            setHasMore(false);
                            return;
                        }
                        setSkip(skip + 20);
                    }
                }
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    const getSearchValue = useCallback((value: string | null): void => {
        if (value === null) {
            return;
        }
        setSearchValue(value);
        if (value === '') {
            getDataInit();
        } 
    }, []);

    return (
        <InfiniteScroll
            dataLength={products?.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center' }}>No more items to show</p>}
        >
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative rounded-md shadow-sm">
                        <Searchbar
                            onChangeValue={getSearchValue}
                            placeholder="Search products by name"
                            className="pl-16 mb-6 block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
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
