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
        <div className={cn(className, styles.wrapper, 'bg-black/80 backdrop-blur-md border-b border-white/10 md:static fixed top-0 left-0 w-full z-20')}> 
            <div className={cn(styles.header, 'flex items-center justify-between px-4 py-2 md:px-8 md:py-4')}> 
                <Search />
                <UserMenu />
            </div>
        </div>
    );
};
