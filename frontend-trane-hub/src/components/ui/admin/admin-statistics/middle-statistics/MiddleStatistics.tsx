'use client';

import React from 'react';
import styles from './MiddleStatistics.module.scss';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/services/statistics.service';
import { TopMoviesLoading } from './top-movies/TopMoviesLoading';
import { SalesChartLoading } from './sales-chart/SalesChartLoading';
import { TopMovies } from './top-movies/TopMovies';
import { SalesChart } from './sales-chart/SalesChart';

interface Props {
    className?: string;
}

export const MiddleStatistics: React.FC<Props> = ({ className }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['middle statistics'],
        queryFn: () => statisticsService.getMiddle(),
    });

    if (isLoading)
        return (
            <div className={cn(className, styles.wrapper)}>
                <div className={styles.top_movies}>
                    <TopMoviesLoading />
                </div>
                <div className={styles.sales_chart}>
                    <SalesChartLoading />
                </div>
            </div>
        );

    return (
        <div className={cn(className, styles.wrapper)}>
            {data ? (
                <>
                    <div className={styles.top_movies}>
                        <TopMovies data={data.topMovies} />
                    </div>
                    <div className={styles.sales_chart}>
                        <SalesChart data={data.sales} />
                    </div>
                </>
            ) : (
                <div>нету данных для статистики</div>
            )}
        </div>
    );
};
