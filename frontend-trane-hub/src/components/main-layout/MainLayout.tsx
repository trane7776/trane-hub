import React, { PropsWithChildren } from 'react';

import styles from './MainLayout.module.scss';
import { Header } from './header/Header';
import { Sidebar } from './sidebar/Sidebar';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className="flex-1">
                <Header />
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    );
};
