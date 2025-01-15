'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAdminActors } from './useAdminActors';
import { AdminHeader } from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import { AdminList } from '@/components/ui/admin/admin-table/admin-list/AdminList';

interface Props {
    className?: string;
}

export const Actors: React.FC<Props> = ({ className }) => {
    const {
        handleSearch,
        searchTerm,
        actors,
        isLoading,
        setSearchTerm,
        createAsync,
        deleteAsync,
    } = useAdminActors();

    return (
        <div className={cn(className, 'px-6')}>
            <Heading>актеры</Heading>
            <AdminHeader
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onClick={createAsync}
            />
            <AdminList
                listItems={actors || []}
                headerItems={['имя', 'ссылка']}
                isLoading={isLoading}
                removeHandler={deleteAsync}
            />
        </div>
    );
};
