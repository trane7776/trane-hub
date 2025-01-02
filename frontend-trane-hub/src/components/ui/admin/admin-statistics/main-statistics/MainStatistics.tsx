'use client';
import { Heading } from '@/components/ui/heading/Heading';
import { statisticsService } from '@/services/statistics.service';
import { useQuery } from '@tanstack/react-query';
import styles from './MainStatistics.module.scss';
import React from 'react';
import { StatisticItem } from './StatisticItem';
import { StatisticItemLoading } from './StatisticItemLoading';

interface Props {
    className?: string;
}

export const MainStatistics: React.FC<Props> = ({ className }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['main-statistics'],
        queryFn: () => statisticsService.getMain(),
    });

    return (
        <div className={className}>
            <Heading>статистика</Heading>
            <div className={styles.main_statistics}>
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <StatisticItemLoading />
                    ))
                ) : data ? (
                    data.map((item) => (
                        <StatisticItem key={item.id} item={item} />
                    ))
                ) : (
                    <div>нет данных для статистики</div>
                )}
            </div>
        </div>
    );
};
