'use client';
import React from 'react';
import styles from './AdminActions.module.scss';
import { IListItem } from '../admin-list.interface';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

interface Props extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
    className?: string;
    removeHandler?: () => void;
}

export const AdminActions: React.FC<Props> = ({
    className,
    editUrl,
    viewUrl,
    removeHandler,
}) => {
    const { push } = useRouter();

    return (
        <div className={cn(className, styles.actions)}>
            {viewUrl && (
                <button onClick={() => push(viewUrl)}>
                    <Icon name="LuExternalLink" />
                </button>
            )}
            {editUrl && (
                <button onClick={() => push(editUrl)}>
                    <Icon name="LuPencil" />
                </button>
            )}

            {removeHandler && (
                <button onClick={removeHandler}>
                    <Icon name="LuTrash" />
                </button>
            )}
        </div>
    );
};
