'use client';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import styles from './Search.module.scss';
import { SearchField } from '@/components/ui/search-field/SearchField';
import { useSearch } from './useSearch';
import { SearchList } from './search-list/SearchList';

interface Props {
    className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
    const { handleSearch, isSuccess, searchTerm, data, setSearchTerm } =
        useSearch();
    const ref = useRef(null);
    useClickAway(ref, () => {
        setSearchTerm('');
    });
    return (
        <div className={cn(styles.search)} ref={ref}>
            <SearchField
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                searchTerm={searchTerm}
            />
            {isSuccess && <SearchList movies={data || []} />}
        </div>
    );
};
