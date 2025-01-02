import React from 'react';
import styles from './MainStatistics.module.scss';
import { cn } from '@/lib/utils';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
interface Props {
    className?: string;
}

export const StatisticItemLoading: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(className, styles.item)}>
            <div className={styles.header}>
                <SkeletonLoader className="h-5 w-24" />
                <SkeletonLoader className="size-[22px]" />
            </div>
            <SkeletonLoader className="h-7 w-16 mt-2" />
        </div>
    );
};
