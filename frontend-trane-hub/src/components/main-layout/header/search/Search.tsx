'use client';
import { cn } from '@/lib/utils';
import React from 'react';

import styles from './Search.module.scss';
import { SearchField } from '@/components/ui/search-field/SearchField';
import { useSearch } from './useSearch';
import { SearchList } from './search-list/SearchList';

interface Props {
    className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
    const { handleSearch, isSuccess, searchTerm, data } = useSearch();
    return (
        <div className={cn(styles.search)}>
            <SearchField handleSearch={handleSearch} searchTerm={searchTerm} />
            {isSuccess && <SearchList movies={data || []} />}
        </div>
    );
};
