import { cn } from '@/lib/utils';
import React, { ChangeEvent } from 'react';

import styles from './SearchField.module.scss';
import { Icon } from '../Icon';

interface Props {
    className?: string;
    searchTerm: string;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    setSearchTerm: (str: string) => void;
}

export const SearchField: React.FC<Props> = ({
    className,
    searchTerm,
    handleSearch,
    setSearchTerm,
}) => {
    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <label className={cn(className, styles.search)}>
            <Icon name="LuSearch" className={styles.icon} />
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="поиск..."
            />
            <button onClick={handleClear} className={styles.clear}>
                <Icon name="LuX" />
            </button>
        </label>
    );
};
