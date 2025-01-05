import React from 'react';

import styles from './SalesChart.module.scss';
import { Loader } from '@/components/ui/Loader';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
}

export const SalesChartLoading: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(className, styles.sales_chart)}>
            <div className="h-[390px] w-full flex items-center justify-center">
                <Loader />
            </div>
        </div>
    );
};
