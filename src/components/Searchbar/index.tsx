import React, { forwardRef, ImgHTMLAttributes, useState, ChangeEvent, useEffect } from 'react';

import images from '../../assets/images';
import { useDebounce } from '../../hooks';

interface SearchbarProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    onClick?: () => void;
    className?: string;
    onChangeValue: (value: string) => void;
}

const Searchbar = forwardRef<HTMLImageElement, SearchbarProps>(({ src, alt, onClick, className, onChangeValue, ...props }, ref) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        onChangeValue(debounceValue);
    }, [debounceValue])

    const handleChangeSearchValue = async(e: ChangeEvent<HTMLInputElement>) => {
        const SearchValue = e.target.value;
        if (!SearchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    }

    return (
        <>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <img alt="loupe" src={images.loupe} className="ml-2 h-5 w-5 flex-shrink-0" />
            </div>
            <input
                id="search-input"
                name="search-input"
                type="text"
                placeholder="Search products by name"
                className="mb-6 block w-full rounded-md border-0 pl-14 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChangeSearchValue}
            />
        </>
    );
});

export default Searchbar;
