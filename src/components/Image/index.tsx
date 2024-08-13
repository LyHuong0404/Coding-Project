import React, { forwardRef, ImgHTMLAttributes } from 'react';
import classNames from 'classnames';

import images from '../../assets/images';
import styles from './styles.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  onClick?: () => void;
  className?: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, onClick, className, ...props }, ref) => {

    if (!src) {
        src = images.noimage;
    }

    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={src}
        alt={alt}
        {...props}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = images.noimage;
        }}
        onClick={onClick}
      />
    );
  }
);


export default Image;
