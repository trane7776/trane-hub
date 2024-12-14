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
        <div className={cn(styles.wrapper, className)}>
            <div className={styles.sidebar}>
                <Logo />
                <MenuContainer />
                <Subscribe />
            </div>
        </div>
    );
};
