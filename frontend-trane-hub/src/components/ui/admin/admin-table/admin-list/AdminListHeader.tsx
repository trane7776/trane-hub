import { cn } from '@/lib/utils';
import React from 'react';
import styles from './AdminList.module.scss';
interface Props {
    className?: string;
    headerItems: string[];
}

export const AdminListHeader: React.FC<Props> = ({
    className,
    headerItems,
}) => {
    return (
        <div className={cn(className, styles.item, styles.item_header)}>
            {headerItems.map((value, index) => (
                <div key={index}>{value}</div>
            ))}
            <div>действия</div>
        </div>
    );
};
