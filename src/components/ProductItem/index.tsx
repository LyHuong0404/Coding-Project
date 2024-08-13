import React, { forwardRef, ImgHTMLAttributes } from 'react';

import Image from '../Image';

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

interface ProductItemProps extends ImgHTMLAttributes<HTMLImageElement> {
    product: Product;
}

const ProductItem = forwardRef<HTMLImageElement, ProductItemProps>(({ product, ...props }, ref) => {
    return (
        <a key={product.id} href={product.thumbnail} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                    alt={product.title}
                    src={product.thumbnail}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
        </a>
    );
});

export default ProductItem;
