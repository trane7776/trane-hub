'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAdminReviews } from './useAdminReviews';
import { AdminHeader } from '@/components/ui/admin/admin-table/admin-header/AdminHeader';
import { AdminList } from '@/components/ui/admin/admin-table/admin-list/AdminList';

interface Props {
    className?: string;
}

export const Reviews: React.FC<Props> = ({ className }) => {
    const { reviews, isLoading, deleteAsync } = useAdminReviews();

    return (
        <div className={cn(className, 'px-6')}>
            <Heading>отзывы</Heading>

            <AdminList
                listItems={reviews || []}
                headerItems={['рейтинг', 'имя пользователя']}
                isLoading={isLoading}
                removeHandler={deleteAsync}
            />
        </div>
    );
};
