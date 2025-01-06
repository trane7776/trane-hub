'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAdminUsers } from './useAdminUsers';
import { AdminHeader } from '@/components/ui/admin/admin-table/admin-header/AdminHeader';

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
    return (
        <div className={cn(className, 'px-6')}>
            <Heading>пользователи</Heading>
            <AdminHeader
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
    );
};
