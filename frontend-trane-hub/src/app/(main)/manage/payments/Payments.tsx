'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAdminPayments } from './useAdminPayments';
import { AdminList } from '@/components/ui/admin/admin-table/admin-list/AdminList';

interface Props {
    className?: string;
}

export const Payments: React.FC<Props> = ({ className }) => {
    const { payments, isLoading, deleteAsync } = useAdminPayments();

    return (
        <div className={cn(className, 'px-6')}>
            <Heading>платежы</Heading>

            <AdminList
                listItems={payments || []}
                headerItems={['статус', 'дата', 'стоимость', 'пользователь']}
                isLoading={isLoading}
                removeHandler={deleteAsync}
            />
        </div>
    );
};
