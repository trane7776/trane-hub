import { IMainStatisticsResponse } from '@/types/statistics.types';
import React from 'react';
import CountUp from 'react-countup';
import styles from './MainStatistics.module.scss';
import { getIcon } from './statistic-util';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    item: IMainStatisticsResponse;
}

export const StatisticItem: React.FC<Props> = ({ className, item }) => {
    const Icon = getIcon(item.id);
    return (
        <div className={cn(className, styles.item)}>
            <div className={styles.header}>
                <p className={styles.name}>{item.title}</p>
                <Icon className={styles.icon} />
            </div>
            <h2 className={styles.value}>
                <CountUp end={item.value} />
            </h2>
        </div>
    );
};
