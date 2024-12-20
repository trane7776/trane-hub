import React from 'react';
import styles from './Header.module.scss';
import { cn } from '@/lib/utils';
import { Search } from './search/Search';
import { UserMenu } from './user-menu/UserMenu';
interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(className, styles.wrapper)}>
            <div className={styles.header}>
                <Search />
                <UserMenu />
            </div>
        </div>
    );
};
