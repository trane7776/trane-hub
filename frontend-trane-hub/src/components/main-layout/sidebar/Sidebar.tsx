import React from 'react';
import styles from './Sidebar.module.scss';
import { cn } from '@/lib/utils';
import { Logo } from './logo/Logo';
import { MenuContainer } from './navigation/MenuContainer';
import { Subscribe } from './subscribe/Subscribe';

interface Props {
    className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
    return (
        <aside className={cn(styles.wrapper, className, 'hidden md:block md:w-64 bg-black border-r border-white/10 min-h-screen')}> 
            <div className={styles.sidebar + ' flex flex-col h-full'}>
                <Logo />
                <MenuContainer />
                <Subscribe />
            </div>
        </aside>
    );
};
