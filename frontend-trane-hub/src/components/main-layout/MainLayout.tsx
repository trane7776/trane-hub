import React, { PropsWithChildren } from 'react';
import styles from './MainLayout.module.scss';
import { Header } from './header/Header';
import { Sidebar } from './sidebar/Sidebar';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.layout + ' min-h-screen flex flex-col md:flex-row bg-black'}>
            <Header className="fixed top-0 left-0 w-full z-20 md:static md:w-auto" />
            <Sidebar className="hidden md:block md:w-64" />
            <main className="flex-1 pt-16 md:pt-0 px-2 md:px-0 w-full max-w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    );
};
