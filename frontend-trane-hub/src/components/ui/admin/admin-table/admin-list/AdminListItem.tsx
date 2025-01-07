import React from 'react';
import styles from './AdminList.module.scss';
import { IAdminListItem } from './admin-list.interface';
import { cn } from '@/lib/utils';
import { AdminActions } from './admin-actions/AdminActions';

interface Props extends IAdminListItem {
    className?: string;
}

export const AdminListItem: React.FC<Props> = ({
    className,
    listItem,
    removeHandler,
}) => {
    return (
        <div className={cn(className, styles.item)}>
            {listItem.items.map((value, index) => (
                <div key={index}>{value}</div>
            ))}
            <AdminActions
                viewUrl={listItem.viewUrl}
                editUrl={listItem.editUrl}
                removeHandler={removeHandler}
            />
        </div>
    );
};
