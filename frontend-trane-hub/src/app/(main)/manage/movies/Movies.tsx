'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAdminMovies } from './useAdminMovies';
import { AdminHeader } from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import { AdminList } from '@/components/ui/admin/admin-table/admin-list/AdminList';

interface Props {
    className?: string;
}

export const Movies: React.FC<Props> = ({ className }) => {
    const {
        handleSearch,
        searchTerm,
        movies,
        isLoading,
        setSearchTerm,
        createAsync,
        deleteAsync,
    } = useAdminMovies();

    return (
        <div className={cn(className, 'px-6')}>
            <Heading>фильмы</Heading>
            <AdminHeader
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onClick={createAsync}
            />
            <AdminList
                listItems={movies || []}
                headerItems={['название', 'жанры', 'просморты']}
                isLoading={isLoading}
                removeHandler={deleteAsync}
            />
        </div>
    );
};
