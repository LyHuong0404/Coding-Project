import React from 'react';

import styles from './styles.css';
import Header from '../components/Header';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default DefaultLayout;
