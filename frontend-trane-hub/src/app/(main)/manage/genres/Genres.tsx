'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAdminGenres } from './useAdminGenres';
import { AdminHeader } from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import { AdminList } from '@/components/ui/admin/admin-table/admin-list/AdminList';

interface Props {
    className?: string;
}

export const Genres: React.FC<Props> = ({ className }) => {
    const {
        handleSearch,
        searchTerm,
        genres,
        isLoading,
        setSearchTerm,
        createAsync,
        deleteAsync,
    } = useAdminGenres();

    return (
        <div className={cn(className, 'px-6')}>
            <Heading>жанры</Heading>
            <AdminHeader
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onClick={createAsync}
            />
            <AdminList
                listItems={genres || []}
                headerItems={['название', 'ссылка']}
                isLoading={isLoading}
                removeHandler={deleteAsync}
            />
        </div>
    );
};
