import React, { forwardRef, ImgHTMLAttributes, useState, ChangeEvent, useEffect, memo } from 'react';
import classNames from 'classnames';

import images from '../../assets/images';
import { useDebounce } from '../../hooks';

interface SearchbarProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    placeholder?: string;
    onChangeValue: (value: string | null) => void;
}

const Searchbar = forwardRef<HTMLImageElement, SearchbarProps>(
    ({ src, alt, onClick, className, onChangeValue, placeholder, ...props }, ref) => {
        const [searchValue, setSearchValue] = useState<string | null>(null);

        const debounceValue = useDebounce(searchValue, 500);

        useEffect(() => {
            onChangeValue(debounceValue);
        }, [debounceValue]);

        const handleChangeSearchValue = async (e: ChangeEvent<HTMLInputElement>) => {
            const SearchValue = e.target.value;
            if (!SearchValue.startsWith(' ')) {
                setSearchValue(e.target.value);
            }
        };

        return (
            <>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <img alt="loupe" src={images.loupe} className="ml-2 h-5 w-5 flex-shrink-0" />
                </div>
                <input
                    id="search-input"
                    name="search-input"
                    type="text"
                    placeholder={placeholder}
                    className={classNames(className)}
                    onChange={handleChangeSearchValue}
                />
            </>
        );
    },
);

export default memo(Searchbar);
