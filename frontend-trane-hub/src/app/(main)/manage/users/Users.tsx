'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAdminUsers } from './useAdminUsers';
import { AdminHeader } from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import { AdminList } from '@/components/ui/admin/admin-table/admin-list/AdminList';

interface Props {
    className?: string;
}

export const Users: React.FC<Props> = ({ className }) => {
    const {
        handleSearch,
        searchTerm,
        users,
        isLoading,
        setSearchTerm,
        deleteAsync,
    } = useAdminUsers();
    console.log(users);

    return (
        <div className={cn(className, 'px-6')}>
            <Heading>пользователи</Heading>
            <AdminHeader
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <AdminList
                listItems={users || []}
                headerItems={['имя', 'email', 'роль']}
                isLoading={isLoading}
                removeHandler={deleteAsync}
            />
        </div>
    );
};
