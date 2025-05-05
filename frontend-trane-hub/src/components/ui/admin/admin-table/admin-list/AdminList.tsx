import React from 'react';
import { IListItem } from './admin-list.interface';
import { cn } from '@/lib/utils';
import { AdminListHeader } from './AdminListHeader';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import styles from './AdminList.module.scss';
import { AdminListItem } from './AdminListItem';

interface Props {
    className?: string;
    listItems: IListItem[];
    headerItems: string[];
    isLoading: boolean;
    removeHandler?: (id: string) => void;
}

export const AdminList: React.FC<Props> = ({
    className,
    listItems,
    headerItems,
    isLoading,
    removeHandler,
}) => {
    return (
        <div className={cn(className, 'mb-12 overflow-x-auto')}> {/* добавлен горизонтальный скролл */}
            <div className="min-w-[500px]">
                <AdminListHeader headerItems={headerItems} />
                {isLoading ? (
                    <div className={styles.loading}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <SkeletonLoader className="h-11" key={index} />
                        ))}
                    </div>
                ) : listItems.length ? (
                    listItems.map((listItem) => (
                        <AdminListItem
                            key={listItem.id}
                            listItem={listItem}
                            removeHandler={
                                removeHandler
                                    ? () => removeHandler(listItem.id)
                                    : undefined
                            }
                        />
                    ))
                ) : (
                    <div className="text-center py-4 text-sm text-white/60">нет данных</div>
                )}
            </div>
        </div>
    );
};
