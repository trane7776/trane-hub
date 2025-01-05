import { cn } from '@/lib/utils';
import React from 'react';

import styles from '../MiddleStatistics.module.scss';
import { convertPrice } from '@/utils/string/convertPrice';

interface Props {
    className?: string;
    active?: boolean;
    payload?: any[];
    label?: string;
}

export const SalesChartTooltip: React.FC<Props> = ({
    className,
    active,
    payload,
    label,
}) => {
    if (active && payload && payload.length)
        return (
            <div className={cn(className, styles.tooltip)}>
                <p className={styles.title}>{label}</p>
                <p className={styles.value}>
                    прибыль:
                    <span className="ml-2">
                        {convertPrice(payload[0].value)}
                    </span>
                </p>
            </div>
        );
};
